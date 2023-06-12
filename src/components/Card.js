import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';


export default function RecipeReviewCard({source}) {
    return (
        <Grid item xs={12} md={3} style={{padding:'1rem',borderRadius:'1rem'}}>
                <Card>
                <CardMedia
                    component="img"
                    height="194"
                    image={source}
                    alt="dish"
                />
                </Card>
        </Grid>
  );
}