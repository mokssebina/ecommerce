import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Banner from "../../components/Banner";
import ProductFeed from "../../components/ProductFeed";
import Categories from '../../components/Categories';
import Footer from "../../components/Footer";
import FilterFeed from '../../components/FilterFeed';
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { useSession } from 'next-auth/client';
import { withPublic } from '../../components/protected-route';
import { collection, getDoc, query, where, onSnapshot, doc } from "firebase/firestore";
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
  const [userData, setUserData] = useState({});
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
    const getData = async () => {

    try {
      
      if(myData){
        const userDoc = doc(db, `users/${myData}`)  
        const userRef = await getDoc(userDoc);
        console.log("user ref: ",userRef)
  
        setUserData({
          displayName: userRef.data()?.displayName || null,
          companyName: userRef.data()?.displayName || null,
          email: userRef.data()?.email,
          service: userRef.data()?.service,
          uid: userRef.data()?.userId,
          displayPicture: userRef.data()?.displayPicture,
          account: userRef.data()?.account,
          status: userRef.data()?.status,
          createdDate: userRef.data()?.createdDate,
          featureProductPic: userRef.data()?.featureProductPic,
          featureProductTitle: userRef.data()?.featureProductTitle,
          featureProductText: userRef.data()?.featureProductText
        })
  
        }
        
    } catch(error) {
        console.log(error)
    }

    console.log("store front data: ",userData)
    }

    return getData()
  },[])  

  useEffect(() => {
    const getListings = () => {
      const ref = collection(db, "listings")
      const q = query(ref, where("userId", "==", myData))
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

      <div className='w-full bg-gray-800'>
        <div className='w-full h-full md:flex md:w-10/12 lg:w-8/12 p-10 mx-auto'>
          <div className="w-full h-full lg:w-3/5 transform overflow-hidden pt-3 px-2 text-left align-middle">
           <div className='w-10/12 md:w-10/12 lg:w-10/12 mx-auto'>
            <p className='font-bold text-white text-2xl lg:text-4xl'>{userData.featureProductTitle}</p>

            <p className='font-semibold text-white text-xl lg:text-3xl mt-6 line-clamp-4'>{userData.featureProductText}</p>
           </div> 
          </div>
          <div className="w-full h-full lg:w-2/5 transform overflow-hidden pt-8 px-2 text-left align-middle">
           <div className='w-11/12 aspect-square md:w-10/12 lg:w-10/12 mx-auto mb-5'>
            <img alt='product' className='w-full h-full' src={userData.featureProductPic} />
           </div> 
          </div>
        </div>
      </div>

      <div className="relative w-full mt-20">

       <div className='w-full mt-10 mb-10 border-b-8 border-amazon_blue'>
        <div className='w-full h-full lg:w-3/4 flex flex-row mx-auto'>
          <div className='w-20 lg:w-64 aspect-square rounded-full ml-3 border-4 border-amazon_blue'>
            <img alt='avatar' className='w-full h-full rounded-full' src={userData.displayPicture} /> 
          </div>
          <div className='h-full pt-12'>
            <p className='ml-5 text-2xl md:text-4xl align-middle mt-8'>{userData.companyName}</p>
          </div>
        </div>
       </div>

       <main className="relative flex flex-grow w-full lg:w-10/12 max-w-screen-2xl mx-auto">

        <div className='relative hidden lg:flex flex-col lg:w-1/4 max-h-full p-2'>

          <img className='w-full h-auto' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/small-business-marketing-on-instagram.png'} /> 

          <img className='w-full h-auto mt-10' src={'https://raw.githubusercontent.com/mokssebina/MMNT/master/creating-online-ads-guide.png'} /> 

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