import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import { ShoppingCartIcon, PlusIcon, HeartIcon } from "@heroicons/react/outline";
import Image from 'next/image';
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket } from '../../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast, Toaster } from "react-hot-toast";



const ProductDetails = () => {

  document.body.style.backgroundColor = "#fffff";

  const { user } = useContext(AuthContext)

  const dispatch = useDispatch();
  const router = useRouter();
  const { myData } = router.query;
  const [data, setData] = useState({})
  const [hidden, setHidden] = useState(true)


  function handleResize() {
    if (innerWidth > 1024) {
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

  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING)

  const [hasPrime] = useState(Math.random() < 0.5)

  useEffect(() => {
    const getDetails = () => {
      if (myData) setData(JSON.parse(myData));

      console.log("product data: ", myData)
    }

    return getDetails()

  }, [router.query]);


  const addItemToBasket = () => {
    const product = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      store: data.store,
      userId: data.userId,
      brandName: data.brandName
    }

    //Send the product as an action to the REDUX store
    dispatch(addToBasket(product))
  }

  const addToWishlist = async () => {

    const dbRef = collection(db, `wishlist`)

    try {

      await addDoc(dbRef, {
        item: data.title,
        photoURL: data.image,
        price: data.price,
        category: data.category,
        description: data.description,
        userId: user?.uid,
        store: data.store,
        inStock: "yes",
        productId: data.productId,
        brandName: data.brandName
      })
        .then(async (docRef) => {
          console.log("product ID: ", docRef.id)
          const listingRef = doc(db, "wishlist", `${docRef.id}`)

          await updateDoc(listingRef, {
            productId: docRef.id
          });

          toast.success("Item added to Wishlist!");

        });

    } catch (error) {

      toast.error("Item could not be added to wishlist.");

    }

  }

  return (
    <>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
      <div className="h-full w-full flex flex-col">
        <main className="relative w-full lg:flex lg:w-11/12 xl:w-9/12 max-w-screen-2xl mx-auto pt-5 mb-5">

          <div className='relative w-full md:full lg:w-11/12 mx-auto pt-1 px-3'>

            <div className='w-full h-full bg-white sm:flex md:flex lg:flex p-4'>

              <div className='relative w-full md:w-2/4 lg:w-2/4'>
                <div className='w-11/12 mx-auto aspect-square bg-slate-200 rounded-lg md:space-x-2'>
                  {data.image &&
                    <img className='relative w-full h-full' src={data.image} objectFit='cover' />
                  }
                </div>
                <div className='w-11/12 mx-auto py-2'>
                  <div className='w-1/5 mt-2 aspect-square bg-slate-200 rounded-lg md:space-x-2'>
                    {data.image &&
                      <img className='w-full h-full' src={data.image} objectFit='cover' />
                    }
                  </div>
                </div>
              </div>
              <div className='relative w-full md:w-2/4 lg:w-2/4 mt-5 px-3'>

                <div className='w-full border-b-2 border-gray-300 py-3'>

                  <p className='font-bold text-gray-800 text-xl md:text-2xl mb-4'>{data.title}</p>

                  <p className='text-sm my-1 md:text-base text-purple-700 hover:underline'>{data.brandName}</p>

                  <p className='text-sm my-1 sm:text-base md:text-base lg:text-base text-gray-700'>{data.description}</p>
                </div>

                <div className='w-full border-b-2 border-gray-300 py-3'>
                  <p onClick={() =>
                    router.push({
                      pathname: `/store/${data.userId}`,
                      query: {
                        myData: data.userId
                      }
                    })
                  } className='my-1 text-sm md:text-base text-purple-700 cursor-pointer mb-4 hover:underline'>{data.store}</p>

                  <p className='my-1 text-sm md:text-base text-gray-700'>{data.category}</p>
                </div>

                <div className='w-full flex mt-4'>
                  <div className='w-2/4 h-10 sm:w-1/3 md:w-2/5 flex bg-gray-200 border border-gray-500 rounded-full'>
                    <div className='w-1/3 h-full border-r-2 border-gray-500'>
                      <button className='w-full h-full'>
                        <p className='text-red-600 text-lg'>-</p>
                      </button>
                    </div>
                    <div className='w-1/3 h-full'></div>
                    <div className='w-1/3 h-full border-l-2 border-gray-500'>
                      <button className='w-full h-full'>
                        <p className='text-green-600 text-lg'>+</p>
                      </button>
                    </div>
                  </div>
                </div>

                <div className='w-full p-2'>

                  <div className='relative w-full my-3 flex flex-col py-1'>
                    <h3 className='font-semibold text-xl md:text-2xl text-grey-700'>{`P${data.price}`}</h3>
                  </div>
                  <div className='w-full h-8 flex py-1 space-x-2'>
                    <button onClick={addItemToBasket} disabled={user ? false : true} className='w-2/4 h-10 rounded-full cursor-pointer text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-700'>
                      <p className='text-sm'>Add To Cart</p>
                    </button>
                    <button onClick={addItemToBasket} disabled={user ? false : true} className='w-2/4 h-10 rounded-full cursor-pointer text-white bg-purple-700 hover:bg-purple-900'>
                      <p className='text-sm'>Add To Wishlist</p>
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </main>
        {/*
        <main className="relative w-full lg:w-11/12 xl:w-9/12 max-w-screen-2xl mx-auto p-4">
          {data.description &&
            <div className='w-full md:full lg:w-11/12 py-1 bg-white mt-10 mb-16 mx-auto rounded-lg'>
              <div className='w-full h-12 md:h-10 p-2 mb-4 border-gray-400 border-b'>
                <p className='font-semibold text-lg text-gray-800'>Description</p>
              </div>
              <div className='w-full p-2 mb-4'>
                <p className='text-sm sm:text-base md:text-base lg:text-base text-gray-700'>{data.description}</p>
              </div>
            </div>
          }
        </main>
      */}
      </div>
      <p className='hidden'>{data.productId}</p>
      <p className='hidden'>{data.userId}</p>
    </>

  )
}

export default ProductDetails
/*
export async function getServerSideProps() {
    const data = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
    .then((res) => res.json())
    //.then((json) => console.log(json));
  
    console.log("products: ",data)
    //console.log("products: ",products)
  
    //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale`)
  
    //console.log("properties: ",propertyForSale)
  
    return { props: {
      products: data
      //propertiesForSale: propertyForSale?.hits,
    },
   }
  }
  */
