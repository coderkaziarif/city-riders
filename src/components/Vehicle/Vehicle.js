import { Card, CardMedia, makeStyles } from '@material-ui/core';
import { Box, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) =>({
   root: {
      // maxWidth: 145,
      // paddingTop: theme.spacing(5),
      // marginTop: '65%',
      
   },
   
}))


const Vehicle = ({vehicle}) => {
   // const classes = useStyles();

   const navigate = useNavigate();
   const url = `/${vehicle.path}`;
   

   return (
      <>
      
         <Grid container sx={{ marginTop:'40vh', }}>
           
            <Card sx={{ maxWidth: 345 }}>
               <CardActionArea onClick={()=> navigate(url)}>                 
                  <CardMedia 
                            
                     component='img'
                     height='100'
                     width='100%'
                     image={vehicle.imgUrl}
                     alt='transport'
                     />
                     <CardContent>
                        <Typography variant='h6'  sx={{textAlign:"center"}}>
                           {vehicle.name}
                        </Typography>
                     </CardContent>        
               </CardActionArea>                                                              
            </Card>
          
         </Grid>
 
      </> 
   );
};

export default Vehicle;