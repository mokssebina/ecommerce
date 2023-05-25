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
    if (myData) setData(JSON.parse(myData));
  }, [router.query]);
  

  useEffect(() => {
    const getListings = async () => {
      const ref = collection(db, "listings")
      
      onSnapshot(ref, (snapshot) => {
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return getListings()
  },[])

  useEffect(() => {
    const getListings = async () => {
      const ref = collection(db, "listings")
      const q = query(ref, where("userId", "==", `${data.userId}`))
      onSnapshot(q, (snapshot) => {
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }
    return getListings() 
  },[])


  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      <Head>
        <title>Typhoon</title>
      </Head>

      <div className="relative w-full h-56 sm:h-80 md:h-80 lg:h-80">
       <div className='relative w-full max-h-full md:w-10/12 lg:w-10/12 max-w-screen-2xl mx-auto flex flex-grow p-2'>

        <div className='hidden lg:flex lg:w-1/4 lg:px-2'>
         <Categories /> 
        </div>

        {/*-------------------Banner---------------------*/}
        <div className='w-full flex flex-col sm:w-full md:w-full lg:w-2/4'>

         <div className="w-full h-full sm:h-full md:h-full lg:w-10/12 lg:h-3/5">
          <Banner />
         </div>  

        </div>
        {/*----------------------------------------------*/}

        <div className='hidden lg:flex flex-col lg:w-1/4 lg:p-2'>
         <img className='w-full h-auto' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/Small-Business-Web-Design-600x540.jpg'} /> 
        </div>

       </div>  
      </div>

      <div className="relative w-full bg-gray-200">
       <main className="relative flex flex-col w-full lg:flex lg:w-10/12 max-w-screen-2xl mx-auto">

        <div className='relative w-full lg:w-1/4'>
         
        </div>

        <div className='relative w-full lg:w-3/4'>
         <ProductFeed products={listings} />
        </div>
        
       </main> 
      </div>
      
    </div>
  );
}


export default Store