import React, {useState, useEffect, useContext} from 'react'
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


const ProductDetails = () => {

    //document.body.style.backgroundColor = "#fffff";

    const { user } = useContext(AuthContext)

    const dispatch = useDispatch();
    const router = useRouter();
    const { myData } = router.query;
    const [data, setData] = useState({})
    const [hidden, setHidden] = useState(true)
    const [counter, setCounter] = useState(1)

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
        const getDetails = async() => {
          if (myData) setData(JSON.parse(myData));

          console.log("product data: ",myData)
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
        userId: data.userId
    }
      
      //Send the product as an action to the REDUX store
      dispatch(addToBasket(product))
    }

    const addToWishlist = async() => {

      const dbRef = collection(db, `wishlist`)
              
      await addDoc(dbRef, {
        item: data.title,
        image: data.image,
        price: data.price,
        category: data.category,
        description: data.description,
        userId: user?.uid,
        store: data.store,
        inStock: "yes",
        productId: data.productId,
      })
      .then(async (docRef) => {
        console.log("product ID: ",docRef.id)
        const listingRef =  doc(db, "wishlist", `${docRef.id}`)

        await updateDoc(listingRef, {
          productId: docRef.id
        });
      });

    }

  return (
    <div className="h-full w-full flex flex-col">
     <main className="relative w-full lg:flex lg:w-11/12 xl:w-9/12 max-w-screen-2xl mx-auto pt-5 mb-5">
      <div className='relative w-full md:full lg:w-11/12 pt-1 px-3'>

       <div className='w-full h-full bg-white sm:flex md:flex lg:flex shadow-md p-4'>

        <div className='relative w-full md:w-2/4 lg:w-2/4'>
          <div className='w-11/12 mx-auto aspect-square bg-gray-200 hover:bg-red-600 rounded-lg md:space-x-2'>
            {data.image &&
              <img className='w-full h-full mx-auto' src={data.image} objectFit='cover' />
            }
          </div>
          <div className='w-full p-2'>
            <div className='w-1/6 mt-2 aspect-square hover:bg-red-600 rounded-lg md:space-x-2'>
              {data.image &&
                <img className='w-full h-full' src={data.image} objectFit='cover' />
              }
            </div> 
          </div>
        </div>
        <div className='relative w-full md:w-2/4 lg:w-2/4 px-3'>

          <p className='font-bold text-gray-800 text-2xl md:text-3xl lg:text-3xl mb-4'>{data.title}</p>

          <p onClick={() =>
            router.push({
              pathname: `/store/${data.userId}`,
              query: {
                myData: JSON.stringify(data.userId)
               }})
           } className='mt-2 text-base md:text-lg text-red-600 cursor-pointer mb-4'>{data.store}</p>

          <p className='mt-2 text-sm md:text-base text-gray-700'>{data.category}</p>


          <div className='flex mt-2'>

          </div>

          <div className='w-full flex h-12 p-1 mt-2'>
           <p className='font-semibold text-gray-800 text-base md:text-base mb-4'>Quantity:</p>
           <div className='h-full w-32 ml-3 flex border border-gray-900'>
            <button disabled={counter === 1? true: false} onClick={setCounter(counter-1)} className='w-2/6 h-full cursor-pointer'>
             <p className='text-2xl text-red-600'>-</p> 
            </button>
            <div className='w-2/6 h-full'>{counter}</div>
            <button onClick={setCounter(counter+1)} className='w-2/6 h-full cursor-pointer'>
             <p className='text-2xl text-green-700'>+</p> 
            </button>
           </div>
          </div>

          <div className='w-full p-2'>

            <div className='relative w-full my-5 flex flex-col p-3'>
              <h3 className='font-bold text-2xl md:text-3xl'>{`P${data.price}`}</h3> 
            </div> 
            <div className='w-full h-11 flex p-1'>
              <button onClick={addItemToBasket} disabled={user? false: true} className='w-2/4 h-9 flex md:h-11 text-red-600 hover:text-white lg:h-12 border border-red-600 mt-4 hover:bg-red-600'>
                <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
                  <PlusIcon className="h-4 w-4" /> 
                  <ShoppingCartIcon className="h-4 w-4" />
                  <p className='text-sm'>Add to Cart</p> 
                </div>
              </button>
              <button  onClick={addToWishlist} disabled={user? false: true} className='w-2/4 h-9 flex md:h-11 text-white lg:h-12 bg-red-600 mt-4 mb-4 hover:bg-red-400'>
                <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
                  <HeartIcon className="h-4 w-4" />
                  <p className='text-sm'>Add to WishList</p> 
                </div>
              </button>
            </div>
          </div>
        </div>
       </div>

      </div>

     </main>   
     <main className="relative w-full lg:w-11/12 xl:w-9/12 max-w-screen-2xl mx-auto p-4">
     {data.description && 
      <div className='w-full sm:w-full md:w-full lg:w-full py-1 bg-white shadow-md'>
       <div className='w-full h-12 md:h-10 p-2 mb-4 border-gray-400 border-b'>
        <p className='font-semibold text-lg text-gray-800'>Description</p> 
       </div>
       <div className='w-full p-2 mb-4'>
        <p className='text-sm sm:text-base md:text-base lg:text-base text-gray-700'>{data.description}</p>
       </div> 
      </div>
     }
     <p className='hidden'>{data.productId}</p>
     <p className='hidden'>{data.userId}</p>
     </main>
    </div>
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