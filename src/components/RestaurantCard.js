import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from './Link';

export default function RestaurantCard({restaurant = {}}) {
  console.log(restaurant)
  return (
    <Grid item xs={12} md={3} style={{padding:'1rem',borderRadius:'2rem'}}>
        <Link to={`/restaurant/${restaurant._id}`}>
            <Card>
            <CardMedia
                sx={{ height: 140 }}
                image={restaurant.image || 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'}
                title="restaurant image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {restaurant.name}
                </Typography>
            </CardContent>
            </Card>
        </Link>
    </Grid>
  );
}
