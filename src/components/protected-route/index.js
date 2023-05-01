import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN, HOME } from "../../utils/constant/routesConstants";
import { ThreeCircles } from  'react-loader-spinner'

export const withPublic = (Component) => {
	return function withPublic(props) {
          const router = useRouter();
          const { auth, user } = useContext(AuthContext);
          
          if (user) {
            router.replace(HOME);

            return <div className="relative w-20 h-20 mx-auto mt-60">
              <ThreeCircles
               height="80"
               width="80"
               color="#131921"
               wrapperStyle={{}}
               wrapperClass=""
               visible={true}
               ariaLabel="three-circles-rotating"
               outerCircleColor=""
               innerCircleColor=""
               middleCircleColor=""
              />
            </div>

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
   
               return <div className="relative w-20 h-20 mx-auto mt-60">
              <ThreeCircles
               height="80"
               width="80"
               color="#131921"
               wrapperStyle={{}}
               wrapperClass=""
               visible={true}
               ariaLabel="three-circles-rotating"
               outerCircleColor=""
               innerCircleColor=""
               middleCircleColor=""
              />
            </div>
   
          }
     
          return <Component auth={auth} {...props}/>;

     }

};

