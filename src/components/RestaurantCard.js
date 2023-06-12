import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from './Link';

//todo:
// Need to add images to restaurants and need to include dishes as well
// Need to add a link to the restaurant page


export default function RestaurantCard({restaurant = {}}) {
  return (
    <Grid item xs={12} md={3} style={{padding:'1rem',borderRadius:'1rem'}} onClick={()=>console.log(`clicked ${restaurant._id}`)}>
        <Link to={`/restaurant/${restaurant._id}`}>
            <Card sx={{ maxWidth: 345 }}>
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
