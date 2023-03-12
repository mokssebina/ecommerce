import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { LOGIN } from "../../utils/constant/routesConstants";
import CircularProgress from '@mui/material/CircularProgress';


const ProtectedRoute = ({ children }) => {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {

     const unsubscribe = () => {
        if (user) {
            console.log("user exist")  
           } else {
            router.push(LOGIN);
           }
     }   

     return () => unsubscribe
	}, [router, user]);

	return <div>{user ? children : <CircularProgress/>}</div>;
};

export default ProtectedRoute;
