import React from 'react';

import {Box, Grid} from '@mui/material';
import './Home.css';
import Vehicle from '../Vehicle/Vehicle';


const Home = () => {


   const vehicles = [
      {
         name : "BIKE",
         capacity: 1,
         imgUrl:"/images/BIKE.png",
         price: 55,
         path:'destination'
      },
      {
         name : "CAR",
         capacity: 3,
         imgUrl: "/images/CAR.png ",
         price: 35,
         path:'destination'
      },
      {
         name : "BUS",
         capacity: 4,
         imgUrl: "/images/BUS.png",
         price: 15,
         path:'destination'
      },
      {
         name : "TRAIN",
         capacity: 15,
         imgUrl: "/images/TRAIN.png",
         price: 10,
         path:'destination'
      },
   ]
   return (
      <Box className='main_container'>
      
         <Grid container spacing={2} sx={{display:'flex',justifyContent: 'center', }}>
           
                {
                  vehicles.map(vehicle => (<Grid item xs={12} sm={2} key={vehicle.name}>
                     <Vehicle vehicle = {vehicle} ></Vehicle>
                  </Grid>
                  ))
               } 
         
         </Grid>
    
      </Box>
   );
};

export default Home;