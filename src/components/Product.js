import React, { useState } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import StarIcon from '@heroicons/react/solid/StarIcon'
import { HeartIcon } from '@heroicons/react/outline';
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function Product({ id, title, price, description, category, image, store, productId, brandName, userId }) {

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

    const product = { id, title, price, description, category, image, productId, store, brandName, userId }

    router.push({
      pathname: `/product/${id}`,
      query: {
        myData: JSON.stringify(product)
      }
    })
  }

  return (

    <div className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white rounded-lg hover:shadow-xl'>

      <div className='absolute w-1/6 top-1 right-1 aspect-square rounded-full bg-white shadow-md hover:shadow-xl z-10 p-1 cursor-pointer'>
        <HeartIcon />
      </div>
      <div className='w-full mx-auto flex flex-col'>
        {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

        <div className='relative w-11/12 aspect-square mx-auto my-2 rounded-lg bg-slate-200'>
          {image &&
            <img className='relative w-10/12 h-10/12 mx-auto my-3' src={image} objectFit='cover' />
          }
        </div>

        <div className='w-11/12 mx-auto flex'>

          <div className='my-1 w-1/2'>
            <h4 className='text-xs line-clamp-1 font-semibold'>{title}</h4>
          </div>

          <div className='my-1 text-xs font-bold text-right w-1/2'>

            <Currency quantity={price} currency="BWP" />

          </div>

        </div>

        <div className='w-11/12 mb-2 mx-auto'>
          <p className='line-clamp-1 text-xs'>{description}</p>
        </div>

        <div className='w-11/12 my-2 mx-auto'>
          <button className='w-3/5 h-7 border border-purple-700 rounded-full hover:bg-purple-700 hover:text-white'>
            <p className='text-xs text-purple-700 hover:text-white'>Add To Cart</p>
          </button>
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