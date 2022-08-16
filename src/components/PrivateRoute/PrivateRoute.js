import React from 'react';
import { Navigate, Outlet,  } from 'react-router-dom';


const PrivateRoute = ({name}) => {
   // const location = useLocation();
   // state={{path: location.pathname}}
   // state={{from: location}} 
   
   return (
      <>
         name ? <Outlet/> : <Navigate to="/login" />;
      </>
   );
};

export default PrivateRoute;