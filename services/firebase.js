import React, { useState, useEffect, Fragment, useContext } from 'react'
import {
    addDoc,
    arrayUnion,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
    query, 
    where,
    collection,
    onSnapshot
  } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
  import { AuthContext } from '../src/context/AuthContext';
  import { db, storage } from '../src/config/firebase';




export async function getUserByUserId(userId) {

    const result = query(collection(db, "users"), where("userId", "==", `${userId}`));

    const querySnapshot = await getDocs(result);
    /*
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
    */
    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return user

}


