import './Navbar.css';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme)=>({
//    gridAlign : {
//       // padding: theme.spacing(2),
//       // textAlign: 'center',
     
//    }
// }))

const Navbar = () => {
   // const classes = useStyles();
   return (
      <>
      <Box>
   
         <Grid container sx={{paddingTop:'10px',}}>
                  <Grid item xs={12} sm={4}>
                     <Typography variant='h6' component="div" sx={{flexGrow:1, paddingLeft:'5px'}}>
                     City Riders
                     </Typography>
                  </Grid>
            <Grid item xs={12} sm={8}>              
                  <Typography className='link_item'>   
                     <Link className='link' to={"/home"}>Home</Link>
                     <Link className='link' to={"/destination"}>Destination</Link>
                     <Link className='link' to={"/blog"}>Blog</Link>
                     <Link className='link' to={"/contact"}>Contact</Link>
                     
                     <Link className='login' to={"/login"}>
                        <Button color='primary' variant='contained'>Login</Button>
                     </Link>
                     {/* <Button color='primary' variant='contained'><Link className='login' to={"/login"}>Login</Link></Button> */}
                  </Typography>                 
            </Grid>
           

         </Grid> 
    
      </Box>
      </>
   );
};

export default Navbar;