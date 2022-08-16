import { Typography } from '@mui/material';
import React from 'react';

const Destination = (props) => {
   // console.log(props,'user name updated successfully');
   return (
      <div style={{marginTop: "15vh"}}>
         <h2>This is Destination</h2>
         <Typography variant='h5'>{props.name? `Welcome - ${props.name}` : "Login Please"} </Typography>
      </div>
   );
};

export default Destination;