import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import { useQuery} from '@apollo/client';
import { gql } from '@apollo/client';
import RestaurantCard from './RestaurantCard';
import { enqueueSnackbar } from 'notistack';

const SEARCH_RESTAURANTS = gql`
  query SearchRestaurants($query: String!) {
    searchRestaurants(query: $query) {
      _id
      name
      image
    }
  }
`;

const restaurantsNearYou = [
  {
    _id: "64884c3ddfe5e001b06a836b",
    name: 'TGI Fridays',
    image: 'https://generatorfun.com/code/uploads/Random-Restaurant-image-3.jpg',
  },
  {
    _id:"64884c3ddfe5e001b06a8368",
    name: "Chili's",
    image: 'https://generatorfun.com/code/uploads/Random-Restaurant-image-15.jpg',
  },
  {
    _id:"64884c3ddfe5e001b06a8369",
    name: 'Olive Garden',
    image: 'https://generatorfun.com/code/uploads/Random-Restaurant-image-19.jpg',
  },
  {
    _id:"64884c3ddfe5e001b06a836a",
    name: 'Red Lobster',
    image: 'https://generatorfun.com/code/uploads/Random-Restaurant-image-1.jpg',
  }
];
const NearbyRestaurantList = ({searchKey}) => {
return <div style={{width:'inherit'}}>
      {Boolean(searchKey) &&  <Typography variant="h6" style={{position:'relative',top:'2rem',left:'2rem',color:'#7c7a7a'}}>Nothing found</Typography>}
      <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}> Restaurants near you</Typography>
        <Grid item container xs={12} justifyContent={'center'} style={{padding:'1rem',opacity:'100%'}}>
          {restaurantsNearYou.map((item) => {
            return <RestaurantCard key={item} restaurant={item}/>
          })}
        </Grid>
  </div>
}

const Results = ({searchKey,results}) => {
  return <div style={{width:'inherit'}}>
      <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}>{`You're looking for ${searchKey} today`}</Typography>
      <Grid item container xs={12} justifyContent={'center'} style={{padding:'1rem',opacity:'100%'}}>
          {results.map((item) => {
            return <RestaurantCard key={item} restaurant={item}/>
          })}
      </Grid> 
  </div>
}

const RestaurantSearch = () => {
  const [fetching, setFetching] = useState(false);
  const [results,setResults] = useState([])


  const [searchKey, setSearchKey] = useState('');
  const { loading, error, data, refetch } = useQuery(SEARCH_RESTAURANTS, {
    skip: true,
  });

  if(loading) return enqueueSnackbar('Loading...', { variant: 'info' });
  if(error) return enqueueSnackbar(`Error! ${error.message}`, { variant: 'error' });

  const handleSearch = async () => {
    setFetching(true);
    const {data : { searchRestaurants: results = [] }} = await refetch({ query: searchKey });
    setResults(results)
    setFetching(false)
  };

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };
  
  return (
  <Grid container>
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
          fullWidth={true} onChange={handleInputChange}/>
          <Button variant='contained' color='secondary' onClick={handleSearch} style={{position:'relative',top:'1rem'}}>Search</Button>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={6}>
       <img src='/asset.jpeg' alt='restaurant' style={{width:'inherit', opacity: '90%', 'zIndex': '-60'}}/> 
      </Grid>
    </Grid>   
    <Grid container item xs={12} justifyContent={'center'}>
    <Grid item container xs={10} style={{background:'#7c7a7a', opacity:'90%',borderRadius:'2rem',position:'relative',top:'-3rem'}}>
      {Boolean(results.length) ? <Results {...{searchKey,results:results || []}}/> : <NearbyRestaurantList/>}
    </Grid>
    </Grid>   
  </Grid>
  )
};

export default RestaurantSearch;