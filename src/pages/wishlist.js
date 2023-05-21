import React, {useEffect, useState, useContext} from 'react';
import ProductFeed from '../components/ProductFeed';
import {
    query, 
    where,
    collection,
    onSnapshot
} from "firebase/firestore";
import { db } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';



function wishlist() {

    document.body.style.backgroundColor = "#e5e7eb";

    const [wishlist, setWishlist] = useState([{}])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const getWishlist = async () => {
          const ref = collection(db, `wishlist`)
          onSnapshot(ref, (snapshot) => {
           setWishlist(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
        }
    
        return getWishlist()
    },[])


  return (
    <div className="relative w-full">
      <main className="w-full lg:w-9/12 max-w-screen-2xl mx-auto pt-4">

        <p className=' text-2xl font-semibold ml-2'>Wishlist</p>

         <ProductFeed products={wishlist} />

      </main> 
    </div>   
  )
}

export default wishlist