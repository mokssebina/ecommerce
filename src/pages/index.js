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
import { toast, Toaster } from "react-hot-toast";



function Home({ products }) {
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

  const [listings, setListings] = useState([{}])
  const [category, setCategory] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setMenu] = useState(true)
  const [hidden, setHidden] = useState(true)
  const [searchField, setSearchField] = useState("")


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

  }, [])


  useEffect(() => {
    if (listings.includes("Cement", 0)) {
      console.log("it includes")
    }
  }, [])

  const filteredItems = listings.filter(
	  item => item.category && item.category.toLowerCase().includes(searchField.toLowerCase())
    /*
    ||
    item.organisation && item.organisation.toLowerCase().includes(filterText.toLowerCase())
    ||
    item.category && item.category.toLowerCase().includes(filterText.toLowerCase()),
    */
  );

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="h-full w-full flex flex-col">
        <Head>
          <title>Typhoon</title>
        </Head>

        <div className="relative w-full h-60 sm:h-72 md:h-96 bg-cover bg-no-repeat bg-[url('https://raw.githubusercontent.com/mokssebina/MMNT/master/46847014_749257868793600_389873852408135680_n.jpg')]">

          <div className='w-full h-full mt-8 md:w-10/12 lg:w-10/12 max-w-screen-2xl mx-auto'>

            {/*-------------------Banner---------------------*/}
            {/*
            <div className='w-full lg:flex lg:flex-row sm:w-full md:w-full mx-auto'>
              
              <div className='w-full h-full'>
                <Banner />
              </div>
              
            </div>
            */}
            {/*----------------------------------------------*/}

          </div>
        </div>

        <div className="relative w-full">
          {/*
       <div className='w-full h-20 py-4 px-2 lg:hidden'>
        <CategoriesDropdown />
       </div>
      */}
          <main className="relative h-full mt-4 flex flex-col lg:flex-row w-full lg:w-10/12 max-w-screen-2xl mx-auto pb-12">

            <div className='relative w-full flex flex-col space-x-0 sm:flex-row sm:space-x-2 lg:flex-col lg:space-x-0 lg:w-1/4 max-h-full p-2'>

              <CategoriesDropdown searchField={searchField} setSearchField={setSearchField} />

              {searchField &&
                <button className='w-full sm:w-2/4 lg:w-3/4 h-10 border border-gray-800 rounded-md mt-4' onClick={() => setSearchField("")}>Clear Filter</button>
              }

            </div>

            <div className='relative w-full lg:w-3/4'>
              <ProductFeed products={filteredItems} />
            </div>

          </main>
        </div>

      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const products = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
    .then((res) => res.json())
  //.then((json) => console.log(json));

  //console.log("products: ",products)

  //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale`)

  //console.log("listings: ",entries)

  return {
    props: {
      products
      //propertiesForSale: propertyForSale?.hits,
    },
  }
}

//https://fakestoreapi.com/products
//https://raw.githubusercontent.com/mokssebina/MMNT/master/products

//https://dummyjson.com/products/category/automotive

export default Home