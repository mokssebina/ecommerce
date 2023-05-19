import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Header from "../components/AppLayout";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Categories from '../components/Categories';
import Footer from "../components/Footer";
import FilterFeed from '../components/FilterFeed';
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { useSession } from 'next-auth/client';
import { withPublic } from '../components/protected-route';
import { collection, getDoc, query, where, onSnapshot, getDocsFromServer } from "firebase/firestore";
import { db } from '../config/firebase';


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
    const getListings = async () => {
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
    <div className="h-full w-full flex flex-col bg-gray-50">
      <Head>
        <title>Typhoon</title>
      </Head>

      <div className="relative w-full h-56 sm:h-80 md:h-[28rem] lg:h-[32rem]">
       <div className='relative w-full max-h-full md:w-10/12 lg:w-10/12 max-w-screen-2xl mx-auto flex flex-grow p-2'>

        <div className='hidden lg:flex lg:w-1/4 lg:px-2'>
         <Categories /> 
        </div>

        {/*-------------------Banner---------------------*/}
        <div className='w-full flex flex-col sm:w-full md:w-full lg:w-2/4'>

         <div className="w-full h-full sm:h-full md:h-full lg:max-h-3/5">
          <Banner />
         </div>  

         <div className='hidden sm:flex w-full lg:max-h-2/5 lg:p-2'></div>

        </div>
        {/*----------------------------------------------*/}

        <div className='hidden lg:flex flex-col lg:w-1/4 lg:p-2'>
         <img className='w-full h-auto' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/Small-Business-Web-Design-600x540.jpg'} /> 
        </div>

       </div>  
      </div>

      <div className="relative w-full bg-gray-200">
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
  );
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