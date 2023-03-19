import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN, HOME } from "../../utils/constant/routesConstants";
import CircularProgress from '@mui/material/CircularProgress';


export const withPublic = (Component) => {
	return function withPublic(props) {
          const router = useRouter();
          const { auth, user } = useContext(AuthContext);
          
          if (user) {
            router.replace(HOME);

            return <h1>Loading...</h1>

          }
     
          return <Component auth={auth} {...props}/>;

     }

};

export const withProtected = (Component) => {
	return function withProtected(props) {
          const router = useRouter();
          const { auth, user } = useContext(AuthContext);
          
          if (!user) {
               router.replace(LOGIN);
   
               return <h1>Loading...</h1>
   
          }
     
          return <Component auth={auth} {...props}/>;

     }

};

