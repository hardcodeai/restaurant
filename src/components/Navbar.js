import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery, gql } from '@apollo/client';

const GET_CART = gql`
  query GetCart($userId: ID) {
    getCart(userId: $userId) {
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

const Navbar = ({ isLoggedIn }) => {
    const cartId = useSelector((state) => state.cart.cartId);
    const userId = useSelector((state) => state.user.userId);

    const dispatch = useDispatch(); 
    const handleLogin = async() => {
        let userId = '123';
        dispatch({ type: 'SET_USER_LOGIN', payload: true });
        dispatch({ type: 'SET_USER_ID', payload: userId });
        const {data} = await refetch({userId});
        console.log(data.getCart._id,"this be the data")
        dispatch({ type: 'SET_CART_ID', payload: data.getCart._id })
    };

    const { loading, error, data, refetch} = useQuery(GET_CART, {
        variables: { cartId },
        skip: !cartId || !userId
    });
    
    
    return (
        <AppBar position="static">
        <Toolbar>
            <Grid sx={{ flexGrow: 1 }}>
            <IconButton component={Link} to="/" edge="start" color="secondary" aria-label="home">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Order In
                </Typography>
            </IconButton>
            </Grid>
            <Button component={Link} to="/about" color="secondary">
            About
            </Button>
            {isLoggedIn ? (
                    <IconButton color="primary">
                        {
                            cartId ? <Link to={`/cart/${cartId}`}>
                                <ShoppingCart color="secondary" />
                            </Link> : 'No cart'
                        }
                    </IconButton>
            ) : (
            <Button component={Link} to="/" color="secondary" onClick={handleLogin}>
                Login/Signup
            </Button>
            )}
        </Toolbar>
        </AppBar>
    );
};

export default Navbar;
