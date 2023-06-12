import React from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import List  from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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

  const { loading, error, data:{getRestaurantDetails = {}} = {} } = useQuery(GET_RESTAURANT_DETAILS,
    {
      variables: { restaurantId },
      skip: !restaurantId
    });

  // Implement the component to display restaurant details
  return <Grid container>
    <Grid item xs={12}>
      <h1>{getRestaurantDetails.name}</h1>
    </Grid>
    <Grid item xs={12}>
      <h2>Menu</h2>
      <List>
        {(getRestaurantDetails.dishes || []).map((dish) => {
          return <ListItem key={dish._id}>{`${dish.name} - ${dish.price}`}</ListItem>
        })}
      </List>
    </Grid>
  </Grid>;
};

export default RestaurantDetails;
