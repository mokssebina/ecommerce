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
import SearchResults from '../../components/SearchResults';
import Categories from '../../components/Categories';
import Footer from "../../components/Footer";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { useSession } from 'next-auth/client';
import { withPublic } from '../../components/protected-route';
import { array } from 'prop-types';
import { toast, Toaster } from "react-hot-toast";



const SearchPage = ({ products }) => {

    document.body.style.backgroundColor = "#ffffff";

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
        const q = query(ref, where("inStock", "==", "yes"))
        onSnapshot(q, (snapshot) => {
         setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
      }
  
      return getListings()
    },[])


    return (
      <>
      <div>
        <Toaster
         position="top-center"
         reverseOrder={false}
        /> 
      </div>
      <div className="h-full w-full flex flex-col ">

      <div className="relative w-full lg:w-10/12 max-w-screen-2xl mt-5 mx-auto p-1">
        <p className='text-lg md:text-3xl lg:text-3xl font-semibold'>Search Results</p>
      </div> 
       

       <main className="relative flex flex-grow w-full md:w-10/12 lg:w-10/12 max-w-screen-2xl mx-auto">
        {listings.length > 0 ?
         <>
          
          <div className='relative w-full mt-5 mx-auto'>
          <SearchResults
           products={listings}
           searchTerm={data}          
          />
          </div>
          
         </>  
        :
        <p className='text-lg md:text-3xl lg:text-5xl font-semibold'>Not Found</p>
        }
       </main> 
      
      {/*<Footer goToTop={goToTop} />*/}
    </div>
    </>

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

export default SearchPage