import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Button, CardActions, CardContent, Paper } from '@mui/material';
import { useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';


const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($cartId: ID, $userId: ID,$menuItemId: ID!) {
    addToCart(cartId: $cartId, userId:$userId, menuItemId: $menuItemId) {
      _id
    }
  }
`;

export default function RecipeReviewCard({source,content,item}) {
    const cartId = useSelector((state) => state.cart.cartId);
    const userId = useSelector((state) => state.user.userId);
    const [addToCart] = useMutation(ADD_TO_CART_MUTATION);
    const dispatch = useDispatch({ type: 'ADD_TO_CART' });


    const handleAddToCart = () => {
        if(!cartId || !userId) {
            enqueueSnackbar('Please login to add items to cart',{variant:'info'});
            return;
        }

        const data = {
            cartId,
            userId,
            menuItemId: item._id,
        }

        addToCart({
          variables: {
            ...data
          },
        })
          .then((response) => {
            dispatch({ type: 'ADD_TO_CART', payload: data })
            enqueueSnackbar('Item added to cart:', { variant: 'success' });
          })
          .catch((error) => {
            enqueueSnackbar('Error adding item to cart:', { variant: 'error'});
          });
      };


    return (
        <Grid item xs={12} md={3} style={{padding:'1rem',borderRadius:'1rem',width:'inherit'}}>
                <Card>
                <CardMedia
                    component="img"
                    height="194"
                    image={source}
                    alt="dish"
                />
                <CardContent>
                    {content}
                </CardContent>
                <CardActions>
                <Grid container justifyContent={'flex-end'}>
                    <Grid item>
                        <Button size="small" onClick={handleAddToCart} variant='secondary'>Add to Cart</Button>
                    </Grid>
                </Grid>
                </CardActions>
                </Card>
        </Grid>
  );
}