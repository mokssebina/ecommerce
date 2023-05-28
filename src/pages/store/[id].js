import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Header from "../../components/AppLayout";
import Banner from "../../components/Banner";
import ProductFeed from "../../components/ProductFeed";
import Categories from '../../components/Categories';
import Footer from "../../components/Footer";
import FilterFeed from '../../components/FilterFeed';
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { useSession } from 'next-auth/client';
import { withPublic } from '../../components/protected-route';
import { collection, getDoc, query, where, onSnapshot, getDocsFromServer } from "firebase/firestore";
import { db } from '../../config/firebase';


function Store() {
  /*
  const [session] = useSession();

  if(!session) {
    console.log("There is no ongoing session")
  }
  else {
    console.log("There is a session")
  }
  */

  document.body.style.backgroundColor = "#e5e7eb";

  
  const router = useRouter();
  const { myData } = router.query;
  const [data, setData] = useState({})

  const [listings, setListings] = useState([{}]);
  const [category, setCategory] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setMenu] = useState(true)
  const [hidden, setHidden] = useState(true)

  //console.log("listings: ",entries)


  useEffect(() => {
    if (myData) setData(myData);

    console.log("product data: ",myData)
  }, [router.query]);
  

  useEffect(() => {
    const getListings = () => {
      const ref = collection(db, "listings")
      const q = query(ref, where("userId", "==", `${data.userId}`))
      onSnapshot(q, (snapshot) => {
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

  }
    return getListings() 
  },[])


  return (
    <div className="h-full w-full flex flex-col">
      <Head>
        <title>Typhoon</title>
      </Head>

      <h1>Merchant</h1>

      <div className='w-full bg-gray-800'>
        <div className='w-full h-full md:flex md:w-10/12 lg:w-8/12 p-2 mx-auto'>
          <div className="w-full h-full lg:w-3/5 transform overflow-hidden pt-16 px-2 text-left align-middle">
           <div className='w-10/12 md:w-9/12 lg:w-8/12 mx-auto'>
            <p className='font-semibold text-white text-4xl'>Retro Football</p>

            <p className='font-semibold text-white text-4xl'>An old school style football from the 80's era.</p>
           </div> 
          </div>
          <div className="w-full h-full lg:w-2/5 transform overflow-hidden pt-16 px-2 text-left align-middle bg-black">
           <div className='w-8/12 aspect-square md:w-9/12 lg:w-8/12 mx-auto'>
            <img alt='product' className='w-full h-full' src='https://firebasestorage.googleapis.com/v0/b/jobberbwapp.appspot.com/o/Y9Xxs6cWXdWWEMP1ygPxxT4JNMB3%2Flistings%2Fimages.jpg?alt=media&token=6e795be3-ad24-4a08-a009-7f95dcbca413' />
           </div> 
          </div>
        </div>
      </div>
    </div>  
  );
}


export default Store