import React, {useEffect, useState, useContext} from 'react';
import WishListFeed from '../components/Wishlist';
import {
    query, 
    where,
    collection,
    onSnapshot
} from "firebase/firestore";
import { db } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import { toast, Toaster } from "react-hot-toast";



function wishlist() {

    document.body.style.backgroundColor = "#ffffff";

    const [wishlist, setWishlist] = useState([{}])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const getWishlist = () => {
          const ref = collection(db, `wishlist`)
          onSnapshot(ref, (snapshot) => {
           setWishlist(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
        }
    
        return getWishlist()
    },[])


  return (

    <>
    <div>
     <Toaster
       position="top-center"
       reverseOrder={false}
     /> 
    </div> 
    <div className="relative w-full h-full">
      <main className="w-full h-full lg:w-9/12 max-w-screen-2xl mx-auto pt-4">

        <p className=' text-2xl font-semibold ml-2'>Wishlist</p>

         <WishListFeed products={wishlist} />

      </main> 
    </div> 
    </>

  )
}

export default wishlist