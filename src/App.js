import React, {useEffect, useState} from "react";
import {  BrowserRouter,  Routes, Route} from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Login from "./components/Login/Login";
import NotFound from './components/NotFound/NotFound';
import NewAccount from "./components/NewAccount/NewAccount";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Navbar from './components/Navbar/Navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";




// <----customize theme---->
const theme = createTheme({
  palette:{
    primary : {
      // main: "#f50057",
      main: "#ff5722",
      // main: purple[500]
    },
    // secondary:{
    //   main: "#4dd0e1",
    // }
  },
  typography: {
    fontFamily: "Comic Sans MS"
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  },
});

function App() {
  const [userName, setUserName] = useState("");
  const auth = getAuth();
   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
         // User is signed in,
        setUserName(user.displayName)
      } else {
        // User is signed out
        setUserName("");
      }
      
    });
  }, );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        
            <Navbar/>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='home' element={<Home/>}></Route>
                <Route path="/*" element={<PrivateRoute name={userName}/>}>
                    <Route path='destination' element={<Destination name={userName} />}/>
                </Route>                
                <Route path='blog' element={<Blog/>}/>
                <Route path='contact' element={<Contact/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='newAccount' element={<NewAccount/>} />
                <Route path='*' element={<NotFound/>}/>
              </Routes> 
           
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
