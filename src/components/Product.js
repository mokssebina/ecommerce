import React, {useState} from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function Product({id, title, price, description, category, image, store, productId, brandName, userId}) {

    const dispatch = useDispatch();
    const router = useRouter();

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
    

    const goToDetails = () => {

      const product = {id, title, price, description, category, image, productId, store, brandName, userId}

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
        
       <div className='mt-2 text-base font-semibold'>

        <Currency quantity={price} currency="BWP" />  

       </div>
        
      </div>
      
     </div>
      
      <p className='hidden'>{productId}</p>
      <p className='hidden'>{brandName}</p>
      <p className='hidden'>{store}</p>
      <p className='hidden'>{userId}</p>
    </div>
    
  )
}

export default Product

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed