import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import List  from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import Card from './Card';
import { useSelector } from 'react-redux';

const GET_RESTAURANT_DETAILS = gql`
query GetRestaurantDetails($restaurantId: ID!) {
  getRestaurantDetails(restaurantId: $restaurantId) {
    _id
    name
    dishes {
      _id
      name
      price
    }
  }
}
`;
//Should fetch restaurant details as we land on this page
//if there is no restaurant id in the url, redirect to 404 page -- should introduce error boundry, 
//controllers 
//restaurant should have a restaurant image as banner 
//restaurant name
//restaurant address
//menu of the retaurant
//restaurant reviews
//restaurant rating

const RestaurantDetails = () => {
  const restaurantId = useHistory().location.pathname.split('/')[2];
  const cartData = useSelector((state) => state.cart);
  const { loading, error, data:{getRestaurantDetails = {}} = {} } = useQuery(GET_RESTAURANT_DETAILS,
    {
      variables: { restaurantId },
      skip: !restaurantId
    });

  const getContent = (dish) => {
    let index = (cartData || []).items.map(p=>p.menuItemId).indexOf(dish._id)
    return ~index ? `${cartData.items[index].quantity} in cart` :`${dish.name} - ${dish.price} rupees`
  }

  // Implement the component to display restaurant details
  return <Grid container>
    <Grid item style={{paddingTop:'1rem',paddingLeft:'1rem'}}>
      <Typography variant="h1">{getRestaurantDetails.name}</Typography>
    </Grid>
    <Grid item container justifyContent={'center'} xs={12} style={{paddingTop:'5rem'}}>
      <Grid item container style={{background:'#7c7a7a', width:'90%', opacity:'90%',borderRadius:'2rem'}}>
        <Grid item xs={12} alignSelf={'center'} color={{position:'relative',left:'1rem',top:'0.5rem'}}>
          <Typography variant="h6" style={{ color:'#FFEF00',paddingTop:'1rem',paddingLeft:'1rem'}}>Menu</Typography> 
        </Grid>
        <Grid item container xs={12} style={{paddingTop:'1rem',margin:'2rem'}}>
          {(getRestaurantDetails.dishes || []).map((dish) => {
            return <Card key={dish._id} source={dish._id} content={getContent(dish)}/>
          })}
        </Grid>
      </Grid>
    </Grid>
  </Grid>;
};

export default RestaurantDetails;
