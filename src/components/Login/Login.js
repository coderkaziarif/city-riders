import './Login.css';
import { Box } from '@material-ui/core';
import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useLocation, useNavigate } from 'react-router-dom';



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Login = () => {
   const auth = getAuth(app);
   const [newUser, setNewUser] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [user, setUser] = useState({
      name : "",
      email : "",
      password : "",
      error: "",
      success:false,
   })

   const navigate = useNavigate();
   const location = useLocation();
   // let {from} = location.state || {};
   // let {from} = location.state || {from: {pathname: '/'}};
   // const redirectPath = location.state?.path || '/blog';
   let {from} = location.state?.from || '/' ;


   const handleBlur = (e)=> {
     
      let isFieldValid = true;
      if(e.target.name ==='email') {
         const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
         isFieldValid = isEmailValid;
         console.log(isEmailValid,'Email');

      }
      if(e.target.name === 'password') {
         const isPasswordValid = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value);
         isFieldValid = isPasswordValid;
         console.log(isPasswordValid, 'password');
      }
      if(isFieldValid) {
         const userInfo = {...user};
         userInfo[e.target.name] = e.target.value;
         setUser(userInfo);
         setNewUser(false);
      }
   }

   const handleSubmit = (e)=> {
      e.preventDefault();
      if(!user.email || !user.password){
         setErrorMsg("Fields Are Required");
         return
      }
      setErrorMsg("");

      if(!newUser && user.email && user.password){
         signInWithEmailAndPassword(auth, user.email, user.password)
         .then((res) => {
            const userInfo = {...user};
            userInfo.error = "";
            userInfo.success = true;
            setUser(userInfo);
            // navigate(from.pathname || "/", {replace: true});
            // navigate(redirectPath, {replace: true});
            navigate('destination', {replace: from});
            // setNewUser(false);
         })
         .catch((error) => {
            const userInfo = {...user};
            userInfo.error = error.message;
            userInfo.success = false;
            setUser(userInfo);
            // setNewUser(false);
         });
      }
     
   }

   return (
      <Box style={{marginTop: "15vh"}} >
         <Box component="form"
               sx={{
               '& .MuiTextField-root': { m: 1, width: '25ch' },
               
               }}
               noValidate
               autoComplete="off"
               onSubmit={handleSubmit}>
                  <div className='container'>
                     <div className='innerBox'>
                           <Typography variant='h6' color="inherit">Login</Typography>
                           {newUser && <TextField required label="User Name" name='name' onBlur={handleBlur} variant="standard"/>}<br /><br />

                           <TextField required label="Email" name='email' onBlur={handleBlur} variant="standard" /><br /><br />

                           <TextField required label="Password" name='password' onBlur={handleBlur}type="password"  autoComplete="current-password" variant="standard" /><br /><br />

                           <Typography style={{color:'red', }}>{errorMsg}</Typography> <br />

                           <Typography style={{color:'red'}}>{user.error}</Typography> 

                           { user.success && <Typography style={{color:'green'}}>User {newUser? "Created" : "Logged In"} Successfully
                           </Typography> } <br />
                           
                           <Button color='primary' type='submit' variant='contained'>
                             Login
                           </Button>  <br /><br />
                        
                           <Typography variant='body2'>Don't have an account? <Link className='link2' to={'/newAccount'}>Create an account</Link></Typography>
                           
                     </div>
                  </div>                  
            </Box>        
      </Box>
   );
};

export default Login;