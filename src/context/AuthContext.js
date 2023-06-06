import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
  sendPasswordResetEmail,
	signOut
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { auth, db } from "../config/firebase";
import { HOME, LOGIN } from "../utils/constant/routesConstants";


const AuthContext = createContext({});


const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {

    const getUser = () => {

     onAuthStateChanged(auth, async (user) => {
         if (user) {

           const userRef = await getDoc(doc(db, `users/${user?.uid}`));

           if(user?.account === "customer"){
            setUser({
              ...user,
              displayName: userRef.data()?.firstName || null,
              firstName: userRef.data()?.firstName || null,
              lastName: userRef.data()?.lastName || null,
              email: userRef.data()?.email,
              uid: userRef.data()?.userId,
              displayPicture: userRef.data()?.displayPicture,
              account: userRef.data()?.account,
              status: userRef.data()?.status,
              createdDate: userRef.data()?.createdDate
            });
           } else if (user?.account === "service-provider"){
            setUser({
              ...user,
              
              displayName: userRef.data()?.displayName || null,
              companyName: userRef.data()?.displayName || null,
              email: userRef.data()?.email,
              service: userRef.data()?.service,
              uid: userRef.data()?.userId,
              displayPicture: userRef.data()?.displayPicture,
              account: userRef.data()?.account,
              status: userRef.data()?.status,
              createdDate: userRef.data()?.createdDate,
              featuredProductPic: userRef.data()?.featuredProductPic,
              featuredProductTitle: userRef.data()?.featuredProductTitle,
              featuredProductText: userRef.data()?.featuredProductText
            });
           } else {
            setUser({
              ...user,
              displayName: userRef.data()?.displayName || null,
              email: userRef.data()?.email,
              uid: userRef.data()?.userId,
              displayPicture: userRef.data()?.displayPicture,
              account: userRef.data()?.account,
              status: userRef.data()?.status,
              createdDate: userRef.data()?.createdDate
            });
           }

           setLoading(false);
           console.log("user account active")
           console.log("user account details: ",user)

         } else {

           setUser(null);
           setLoading(false);

         }
       });

    }

    return getUser();
    
  }, []);

  const signUp = async (firstName, lastName, email, password, displayPicture, account, status) => {

    try {

      const { user } = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password,
        (user) => {
          console.log("created user print: ",user)
      });

      await setDoc(doc(db, "users", `${user?.uid}`), {
        displayName: firstName,
        firstName: firstName,  
        lastName: lastName,
        email: user?.email,
        userId: user?.uid,
        displayPicture: displayPicture, 
        account: account, 
        status: status,
        createdDate: serverTimestamp()
      })

        await router.push(HOME);

      
    } catch (error) {
      console.log(error);
      return error;
    }          
          
  };

  const merchantSignUp = async (companyName, email, service, password, displayPicture, account, status) => {

    try {

      const { user } = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password,
        (user) => {
          console.log("created user print: ",user)
      });

      await setDoc(doc(db, "users", `${user?.uid}`), {
        displayName: companyName,
        companyName: companyName,  
        email: user?.email,
        service: service,
        userId: user?.uid,
        displayPicture: "", 
        account: account, 
        status: status,
        createdDate: serverTimestamp(),
        featuredProductPic: "",
        featuredProductTitle: "",
        featuredProductText: ""
      }).then()

      await router.push(HOME);

      
    } catch (error) {
      console.log(error);
      return error;
    }          
          
  };

  const logIn = async (email, password) => {
    try {

      const { user } = signInWithEmailAndPassword(auth, email, password)

      if(user.account === "customer"){
        setUser(user)
      }
      
      await router.push(HOME);
      
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const resetPassword = async (email) => {
    try {
      return sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, merchantSignUp, signUp, logIn, resetPassword, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthContextProvider}