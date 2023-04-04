import React, { useState, useEffect, Fragment, useContext } from 'react'
import { FolderAddIcon } from '@heroicons/react/outline'
import {
  addDoc,
  arrayUnion,
  doc,
  deleteDoc,
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
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../config/firebase';

function StoreFront() {
  return (
    <div>StoreFront</div>
  )
}

export default StoreFront