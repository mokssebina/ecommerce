import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import StarIcon from '@heroicons/react/solid/StarIcon'
import { ShoppingCartIcon, PlusIcon, HeartIcon } from "@heroicons/react/outline";
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { db } from '../config/firebase';

function SearchProduct({id, title, price, description, category, image, store, productId, brandName, userId}) {

    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setData] = useState({})

    const { user } = useContext(AuthContext)


    const MAX_RATING = 5;
    const MIN_RATING = 1;

    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING)

    const [hasPrime] = useState(Math.random() < 0.5)
/*
    const addItemToBasket = () => {
      const product = {id, title, price, description, category, image}
      
      //Send the product as an action to the REDUX store
      dispatch(addToBasket(product))
    }
*/

    useEffect(() => {
        if (id) setData(id);
    }, [router.query]);

    const addItemWishlist = async() => {

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
          console.log("product ID: ",docRef.id)
          const listingRef =  doc(db, "wishlist", `${docRef.id}`)
  
          await updateDoc(listingRef, {
            productId: docRef.id
          });

          toast.success("Item added to Wishlist!")

        });
      } catch (error) {

        toast.error("Item could not be added to Wishlist.")
        
      }

    }
    

    const goToDetails = () => {

      const product = {id, title, price, description, category, image, store, productId, brandName, userId}

      router.push({
      pathname: `/product/${id}`,
      query: {
        myData: JSON.stringify(product)
       }})
    }

  return (
      
    <div className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white p-3 rounded-md shadow-sm hover:shadow-xl border border-purple-700'>
     <div onClick={goToDetails} className='w-full mx-auto flex flex-col'>
     {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

      <div className='w-9/12 aspect-square mx-auto mb-2'>
       {image &&
        <img className='w-full h-full mx-auto' src={image} objectFit='cover' />
       } 
      </div>

      <div className='w-full h-1 mt-3 bg-purple-700'></div>

      <div className='absolute bottom-0 w-full p-1'>
       <h4 className='my-1 line-clamp-1 font-semibold'>{title}</h4>
       
        {/*
        <div className='flex'>

        {Array(rating)
          .fill()
          .map((_,i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}

        </div>

        <p className='text-xs my-2 line-clamp-2'>{description}</p> 
        */}
       <div className='mt-2 text-base font-semibold'>

        <Currency quantity={price} currency="BWP" />  

       </div>
        
      </div>
      
     </div>
      {/*
      <button onClick={addItemWishlist} disabled={user? false: true} className='w-full h-9 flex text-white bg-purple-700 mt-4 hover:bg-purple-900'>
       <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
        <HeartIcon className="h-4 w-4" />
        <p className='text-sm'>Add to Wishlist</p> 
       </div>
      </button>*/}
      <p className='hidden'>{productId}</p>
      <p className='hidden'>{brandName}</p>
      <p className='hidden'>{store}</p>
      <p className='hidden'>{userId}</p>
    </div>
    
  )
}

export default SearchProduct

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed
