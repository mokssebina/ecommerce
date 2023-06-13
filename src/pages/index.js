import React, { useState, useEffect, useContext } from 'react';
import Head from "next/head";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Categories from '../components/Categories';
import { AuthContext } from '../context/AuthContext';
import FilterFeed from '../components/FilterFeed';
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { useSession } from 'next-auth/client';
import { withPublic } from '../components/protected-route';
import { collection, getDoc, query, where, onSnapshot, getDocsFromServer } from "firebase/firestore";
import { db } from '../config/firebase';
import CategoriesDropdown from '../components/CategoriesDropdown';


function Home({products}) {
  /*
  const [session] = useSession();

  if(!session) {
    console.log("There is no ongoing session")
  }
  else {
    console.log("There is a session")
  }
  */

  const { user } = useContext(AuthContext)


  document.body.style.backgroundColor = "#ffffff";

  //document.body.style.backgroundColor = "#e5e7eb";

  const [listings, setListings] = useState([{}]);
  const [category, setCategory] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setMenu] = useState(true)
  const [hidden, setHidden] = useState(true)

  //console.log("listings: ",entries)


  function handleResize() {
    if (innerWidth <= 1024) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }
  

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getListings = () => {
      const ref = collection(db, "listings")
      
      onSnapshot(ref, (snapshot) => {
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return getListings()

  },[])


  useEffect(() => {
    if(listings.includes("Cement", 0)){
      console.log("it includes")
    }
  },[])


  return (
    
    <div className="h-full w-full flex flex-col">
      <Head>
        <title>Typhoon</title>
      </Head>

      <div className="relative w-full h-60 sm:h-full md:h-full lg:h-full bg-white">
       <div className='w-full h-full md:w-10/12 lg:w-10/12 max-w-screen-2xl mx-auto p-2'>

        {/*-------------------Banner---------------------*/}
        <div className='w-full lg:flex lg:flex-row sm:w-full md:w-full mx-auto'>
         <div className='hidden lg:flex lg:w-1/4 h-full'>
          <Categories />
         </div>
         <div className='w-full lg:w-2/4 h-full'>
          <Banner />
         </div>
         <div className='hidden lg:flex lgw-1/4 h-full'></div>
        </div>
        {/*----------------------------------------------*/}

       </div>  
      </div>

      <div className="relative w-full">
      {/*
       <div className='w-full h-20 py-4 px-2 lg:hidden'>
        <CategoriesDropdown />
       </div>
      */}
       <main className="relative flex flex-grow w-full lg:w-10/12 max-w-screen-2xl mx-auto">

        <div className='relative w-full lg:w-3/4'>
         <ProductFeed products={listings} />
        </div>
        
        <div className='relative hidden lg:flex flex-col lg:w-1/4 max-h-full p-2'>

         <img className='w-full h-auto' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/small-business-marketing-on-instagram.png'} /> 

         <img className='w-full h-auto mt-10' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/creating-online-ads-guide.png'} /> 

        </div>
       </main> 
      </div>
      
    </div>    
    
  )
}

export async function getServerSideProps(context) {

  const products = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
  .then((res) => res.json())
  //.then((json) => console.log(json));

  //console.log("products: ",products)

  //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale`)

  //console.log("listings: ",entries)
 
  return { props: {
    products
    //propertiesForSale: propertyForSale?.hits,
  },
 }
}

//https://fakestoreapi.com/products
//https://raw.githubusercontent.com/mokssebina/MMNT/master/products

//https://dummyjson.com/products/category/automotive

export default Home