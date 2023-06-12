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
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function WishlistProduct({id, title, price, description, category, image, store, productId, brandName, userId}) {

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


    const goToDetails = () => {

      const product = {id, title, price, description, category, image, productId, store, userId, brandName}

      router.push({
      pathname: `/product/${id}`,
      query: {
        myData: JSON.stringify(product)
       }})
    }


  return (
    <div className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white p-3 rounded-md shadow-sm hover:shadow-lg border border-purple-700'>
     <div onClick={goToDetails} className='w-full mx-auto flex flex-col'>
     {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

      <div className='w-9/12 aspect-square mx-auto mb-2'>
       {image &&
        <img className='w-full h-full mx-auto' src={image} objectFit='cover' />
       } 
      </div>

      <div className='w-full h-1 bg-purple-700'></div>

      <div className='w-full p-1'>
       <h4 className='my-1 line-clamp-1'>{title}</h4>
        
       <div className='mt-2'>

        <Currency quantity={price} currency="BWP" />  

       </div>
        
      </div>
      
     </div>
      <button onClick={() => deleteDoc(doc(db ,'wishlist', productId))} className='w-full h-9 flex text-white bg-purple-700 mt-2 hover:bg-purple-900'>
       <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
        <p className='text-sm'>Remove from Wishlist</p> 
       </div>
      </button>
      <p className='hidden'>{productId}</p>
      <p className='hidden'>{brandName}</p>
      <p className='hidden'>{store}</p>
      <p className='hidden'>{userId}</p>
    </div>
  )
}

export default WishlistProduct

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed