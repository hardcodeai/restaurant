import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Card from './Card'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
const restaurantsNearYou = ["/pizza.jpg","/salad.jpg","/coffee.jpg","/cake.jpg"];

const NearbyRestaurantList = () => {
return <>
      <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}> Restaurants near you</Typography>
      {/* Slider Section */}
        <Grid item container xs={12} justifyContent={'center'} style={{padding:'1rem',opacity:'100%'}}>
          {restaurantsNearYou.map((item) => {
            return <Card key={item} source={item}/>
          })}
        </Grid>
  </>
}

const Results = ({searchKey,results}) => {
  return <>
      <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}>{`You're looking for ${searchKey} today`}</Typography>
      {
        Boolean(!results.length) ?  <Typography variant="h6" style={{position:'relative','top':'1rem',left:'2rem',color:'#FFEF00'}}>No results to disply</Typography>
      : <List sx={{width: '80%'}}>{
        results.map((item) => 
          <ListItem>
            <h1 key={item}>{item}</h1> 
            <Divider/>
          </ListItem>
        )
      }
      </List>
    }
  </>
}

const RestaurantSearch = () => {
  const [results,setResults] = useState([1,2,3])
  const [searchKey,setSearchKey] = useState('monkey')

  // Implement the component to search for restaurants
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
          fullWidth={true}/>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={6}>
       <img src='/asset.jpeg' alt='restaurant' style={{width:'inherit', opacity: '90%', 'zIndex': '-60'}}/> 
      </Grid>
    </Grid>   
    <Grid container item xs={12} justifyContent={'center'}>
    <Grid item container style={{background:'#7c7a7a', width:'90%', opacity:'90%',borderRadius:'2rem',position:'relative',top:'-3rem',ovreflow:'scroll'}}>
      {Boolean(searchKey) ? <Results {...{searchKey,results}}/> : <NearbyRestaurantList/>}
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