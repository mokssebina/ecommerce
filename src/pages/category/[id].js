import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
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
import { db } from '../../config/firebase';
import Banner from '../../components/Banner';
import ProductFeed from "../../components/ProductFeed";
import Categories from '../../components/Categories';
import Footer from "../../components/Footer";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { useSession } from 'next-auth/client';
import { withPublic } from '../../components/protected-route';
import { array } from 'prop-types';


const CategoryPage = ({ products }) => {

    const router = useRouter();
    const { myData } = router.query;
    const [data, setData] = useState("")
    const [listings, setListings] = useState([{}])

    console.log("my data: ",myData)


    useEffect(() => {
      if (myData) setData(myData);
    }, [router.query]);

    useEffect(() => {
      const getListings = () => {
        const ref = collection(db, "listings")
        const q = query(ref, where("category", "==", `${data}`))
        onSnapshot(q, (snapshot) => {
         setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
      }
  
      return getListings()
    },[])


    return (
        <div className="h-full w-full flex flex-col bg-gray-50">
      <Head>
        <title>Jobber</title>
      </Head>

      <div className="relative w-full h-56 sm:h-80 md:h-[28rem] lg:h-[32rem]">
       <div className='w-full max-h-full md:w-10/12 lg:w-10/12 max-w-screen-2xl mx-auto flex flex-grow p-2'>

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

      <div className="w-full bg-gray-200">

      {/*listings > 0 && 
        <div className="relative w-full lg:w-10/12 max-w-screen-2xl mx-auto">
          <p className='text-lg md:text-3xl lg:text-5xl font-semibold'>Search Results</p>
        </div> 
      */}
       

       <main className="relative flex flex-grow w-full lg:w-10/12 max-w-screen-2xl mx-auto">
        {listings.length > 0 ?
         <>
          <div className='relative hidden lg:flex flex-col lg:w-1/4 max-h-full p-2'>

           <img className='w-full h-auto' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/small-business-marketing-on-instagram.png'} /> 

           <img className='w-full h-auto mt-10' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/creating-online-ads-guide.png'} /> 

          </div>
          <div className='relative w-full lg:w-3/4'>
          <ProductFeed
           products={listings}
          />
          </div>
          
         </>  
        :
        <p className='text-lg md:text-3xl lg:text-5xl font-semibold'>Not Found</p>
        }
       </main> 
      </div>
      
      {/*<Footer goToTop={goToTop} />*/}
    </div>
    )
}
/*
export async function getServerSideProps(context) {
    const products = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
    .then((res) => res.json())
    
    //.then((json) => console.log(json));
  
    console.log("products: ",products)
  
    //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale`)
  
    //console.log("properties: ",propertyForSale)
  
    return { props: {
      products
      //propertiesForSale: propertyForSale?.hits,
    },
   }
  }
*/

export default CategoryPage