import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
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
import { auth, db } from "../config/firebase";
import { HOME } from "../utils/constant/routesConstants";


const AuthContext = createContext({});


const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {

    const getUser = async () => {

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
           } else if (user?.account === "merchant"){
            setUser({
              ...user,
              displayName: userRef.data()?.displayName || null,
              companyName: userRef.data()?.displayName || null,
              email: userRef.data()?.email,
              uid: userRef.data()?.userId,
              displayPicture: userRef.data()?.displayPicture,
              account: userRef.data()?.account,
              status: userRef.data()?.status,
              createdDate: userRef.data()?.createdDate
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

  const merchantSignUp = async (companyName, email, password, displayPicture, account, status) => {

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

  const logIn = async (email, password) => {
    try {
     const { user } = signInWithEmailAndPassword(auth, email, password)

      setUser(user)

      await router.push(HOME);
      
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
    <AuthContext.Provider value={{ user, merchantSignUp, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthContextProvider}