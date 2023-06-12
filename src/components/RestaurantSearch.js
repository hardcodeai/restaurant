import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Card from './Card'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Button, ListItem } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import RestaurantCard from './RestaurantCard';
import { Link } from 'react-router-dom';


const cartId = '6485deaa180c08a582a91d47'

function CartButton() {
  return (
    <Link to={`/cart/${cartId}`}>
      <Button variant='text' color='secondary'>Go to Cart</Button>
    </Link>
  );
}

const SEARCH_RESTAURANTS = gql`
  query SearchRestaurants($query: String!) {
    searchRestaurants(query: $query) {
      _id
      name
    }
  }
`;


{/* <List sx={{width: '80%'}}>{
        results.map((item) => 
          <ListItem>
            <h1 key={item}>{JSON.stringify(item)}</h1> 
            <RestaurantCard restaurant={item}/>
            <Divider/>
          </ListItem>
        )
      }
      </List> 
   */}

const restaurantsNearYou = ["/pizza.jpg","/salad.jpg","/coffee.jpg","/cake.jpg"];
const NearbyRestaurantList = () => {
return <>
      <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}> Restaurants near you</Typography>
        <Grid item container xs={12} justifyContent={'center'} style={{padding:'1rem',opacity:'100%'}}>
          {restaurantsNearYou.map((item) => {
            return <Card key={item} source={item}/>
          })}
        </Grid>
  </>
}

const Results = ({searchKey,results}) => {
  return <div>
      <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}>{`You're looking for ${searchKey} today`}</Typography>
      {
        Boolean(!results.length) ?  
          <Typography variant="h6" style={{position:'relative',top:'2rem',left:'2rem',color:'#7c7a7a'}}>Nothing found</Typography>
      : <Grid item container xs={12} justifyContent={'center'} style={{padding:'1rem',opacity:'100%'}}>
          {results.map((item) => {
            return <RestaurantCard restaurant={item}/>
          })}
        </Grid>
    }
  </div>
}

const RestaurantSearch = () => {
  // const [results,setResults] = useState([])
  const [searchKey,setSearchKey] = useState('')

  const hChange = (e) => {
    const {value} = e.target
    setSearchKey(value)
    // setResults([value,value,value])
  }

  const { loading, error, data:{searchRestaurants:results = []}={}} = useQuery(SEARCH_RESTAURANTS, {
    variables: { query: searchKey }, // Pass the necessary variables
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  // Implement the component to search for restaurants
  return (
  <Grid container>
    <Grid item container xs={12} style={{position:'absolute',top:0,left:'90vw'}}>
      <CartButton/>
    </Grid>
    <Grid container item xs={12} height={'70vh'}>
      <Grid item container xs={12} md={6} alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={8}>
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="subtitle1" gutterBottom>
              Why head out when you can
            </Typography>
            <Typography variant="h4" gutterBottom>
              Order In ?
            </Typography>
          </Box>
          <Input placeholder="Search Your Craving :)" inputProps={{ 'aria-label': 'description' }} 
          fullWidth={true} onChange={hChange}/>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={6}>
       <img src='/asset.jpeg' alt='restaurant' style={{width:'inherit', opacity: '90%', 'zIndex': '-60'}}/> 
      </Grid>
    </Grid>   
    <Grid container item xs={12} justifyContent={'center'}>
    <Grid item container style={{background:'#7c7a7a', width:'90%', opacity:'90%',borderRadius:'2rem',position:'relative',top:'-3rem',ovreflow:'scroll'}}>
      {Boolean(searchKey) ? <Results {...{searchKey,results:results || []}}/> : <NearbyRestaurantList/>}
    </Grid>
    </Grid>   
  </Grid>
  )
};

export default RestaurantSearch;



// <Grid item container xs={12} md={3} justifyContent={'center'}>
// {/* <Grid item>
//   <h1>Restaurant Search</h1>;
// </Grid> */}
// </Grid>
// <Grid item xs={12} md={9}>
// <img src='/asset.jpeg' alt='restaurant' /> 
// </Grid>
// {/* <Grid item xs={12}>
//   <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="restaurant" />
// </Grid> */}