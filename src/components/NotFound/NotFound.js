import {Typography }  from '@material-ui/core';
import React from 'react';

const text = "Sorry your Page is Not found. Error 404!!!"

const NotFound = () => {
   return (
      <div>
         <Typography variant='h2'  component="h2" style={{marginTop: '35vh', marginLeft:"10px", color:"#f50057"}}> {text}
          </Typography>
       
      </div>
   );
};

export default NotFound;