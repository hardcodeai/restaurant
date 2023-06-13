import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {Grid, Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { RemoveCircle,AddCircle } from '@mui/icons-material';
import { useDispatch,useSelector } from 'react-redux';

const GET_CART = gql`
  query GetCart($cartId: ID!) {
    getCart(cartId: $cartId) {
      _id
      items {
        _id
        price
        name 
        quantity
      }
    }
  }
`;

const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($cartId: ID! ,$menuItemId: ID!, $quantity: Int!) {
    updateItemQuantity(cartId:$cartId, menuItemId: $menuItemId, quantity: $quantity) {
      _id
    }
  }
`;

export default function Cart() {
  const cartId = useHistory().location.pathname.split('/')[2];
  const history = useHistory();
  // const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const { loading, error, data } = useQuery(GET_CART, {
    skip: !cartId || !userId,
    fetchPolicy:'network-only',
    variables: { cartId }
  });

  console.log(data,"this is the data")

  const [updateItemQuantity] = useMutation(UPDATE_ITEM_QUANTITY);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error fetching cart: {error.message}</p>;
  }

  const { getCart:{items = []} = {} } = data || {};

  console.log(items,"this is the items")

  const handleQuantityChange = ({action, itemId, quantity}) => {
    updateItemQuantity({
      variables: { cartId, menuItemId: itemId, quantity },
      refetchQueries: [{ query: GET_CART, variables: { cartId } }],
    }).then((response) => {
      console.log('Item added to cart:', response.data.addToCart);
    })
    .catch((error) => {
      console.error('Error adding item to cart:', error);
    });
  };

  const calculateTotalBill = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * (item.quantity  || 1);
    });
    return total + (total * 18/100) || '0';
  };

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      {items.length ?
      <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}>
                    <IconButton variant='small' onClick={()=>handleQuantityChange({action:'remove',itemId:item._id,quantity:item.quantity - 1})} color="primary" aria-label="remove from shopping cart">
                        <RemoveCircle />
                    </IconButton>
                  </Grid>
                  <Grid item container xs={1} justifyContent={'center'}>
                  {item.quantity}
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton variant='small' onClick={()=>handleQuantityChange({action:'add',itemId:item._id,quantity:item.quantity + 1})} color="primary" aria-label="add to shopping cart">
                        <AddCircle />
                    </IconButton>
                  </Grid>
                </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item container xs={12} spacing={2} style={{marginTop:'1rem'}} justifyContent={'flex-end'}>
        <Button variant="contained" color="primary" onClick={calculateTotalBill}>
          Place Order
        </Button>
        <Typography variant='h6' style={{paddingLeft:'1rem'}}>{`Total Bill: ₹${calculateTotalBill()}`}</Typography>
      </Grid>
      </>
       :
       <Grid container style={{paddingTop:'1rem',height:'50vh'}} justifyContent={'center'} alignItems={'center'}>
          <Grid item container xs={3}>
            <Typography variant='h6'>{`There is nothing in your cart 😔`}</Typography>
            <Grid item container xs={12} justifyContent={'center'}>
              <Button variant="contained" color="primary" onClick={() => history.push('/')}>Home</Button>
            </Grid>
          </Grid>
          {' '}
        </Grid>
      }
      
    </Container>
  );
}




