import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import { auth } from "../config/firebase";


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ displayName: null, email: null, uid: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,  
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ displayName: null, email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const logIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};