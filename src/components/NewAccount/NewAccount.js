import './NewAccount.css';
import { Box } from '@material-ui/core';
import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { Link, useLocation, useNavigate } from 'react-router-dom';



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const NewAccount = () => {
   const auth = getAuth(app);
   const navigate = useNavigate();
   const location = useLocation();
   let {from} = location.state || {from: {pathname:'/'}}
   
   const [newUser, setNewUser] = useState(false);
   const [user, setUser] = useState({
      name : "",
      email : "",
      password : "",
      error: "",
      success:false,
   })
   const [errorMsg, setErrorMsg] = useState("");


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
         setNewUser(true);
      }
    
   }

   const handleSubmit = (e)=> {
      e.preventDefault();

      if(!user.name || !user.email || !user.password){
         setErrorMsg("Please fill all the filed");
         return;
      }
      setErrorMsg("");

   
      if(newUser && user.email && user.password){

         createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async (res) => {
               const userInfo = {...user};
               userInfo.error = "";
               userInfo.success = true;
               setUser(userInfo);
               await updateProfile(auth.currentUser,{
                  displayName: user.name
               });
             
               navigate('/destination', {replace: from});        
               // console.log(res.user);            
            })
            .catch((error) => {
               const userInfo = {...user};
               userInfo.error = error.message;
               userInfo.success = false;
               setUser(userInfo);
      
               // setNewUser(true);
            
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
                           <Typography variant='h6' color="inherit">Create an account</Typography>
                            <TextField required label="Name" name='name' onBlur={handleBlur} variant="standard"/><br /><br />

                           <TextField required label="Email"  name='email' onBlur={handleBlur} variant="standard" 
                            /><br /><br />

                           <TextField required label="Password" name='password' onBlur={handleBlur}type="password"  autoComplete="current-password" variant="standard"
                            /><br /><br />

                           <Typography style={{color:'red', }}>{errorMsg}</Typography> <br />

                           <Typography style={{color:'red'}}>{user.error}</Typography> 

                           { user.success && <p style={{color:'green'}}>User {newUser? "Created" : "Logged In"} Successfully
                           </p> } <br />
                           
                           <Button color='primary' type='submit' variant='contained'>
                              Create an account
                           </Button>  <br /><br />
                         
                           <Typography variant='body2'>Already have an  account? 
                              <Link className='link2' to= {'/login'}> Login</Link>
                           </Typography>
                           
                     </div>
                  </div>                  
            </Box>        
      </Box>
   
   );
};

export default NewAccount;