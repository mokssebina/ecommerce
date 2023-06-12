import React, {useState} from 'react'
import Image from 'next/image'
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function CheckoutProduct({id, title, price, description, category, image, counter, increase, decrease}) {

    const dispatch = useDispatch();

    const MAX_RATING = 5;
    const MIN_RATING = 1;
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING)

    const removeItemToBasket = () => {
      const product = {id, title, price, description, category, image}
      //Remove item from REDUX
      dispatch(removeFromBasket({ id }))
    }

  return (
    <div className=' mb-2 p-1 rounded-lg bg-white'>

    <div className='flex flex-col sm:flex-row'>

     <div className='w-full sm:w-2/4 md:w-2/4 lg:w-1/3'>
       <div className='w-full sm:w-5/6 lg:w-3/6'>
        <img alt='product' className='w-full h-full' src={image} />
       </div>
     </div> 

     <div className='w-full py-3 sm:w-2/4 md:w-2/4 lg:w-1/3 lg:pt-8'>

      <p>{title}</p>  

      <div className='flex'>
      {Array(rating).fill().map((_,i) => (
         <StarIcon key={i} className='h-5 text-yellow-500' />
       ))}
      </div>

      <p className='text-xs mt-2 mb-2 line-clamp-3'>{description}</p>

      <Currency quantity={price} currency="BWP" />

     </div>

     <div className='w-full lg:w-1/3 justify-self-end lg:pt-10 space-y-4 p-3'>

      <div className='w-full flex h-12 p-1 mt-2'>
        <p className='font-semibold text-gray-800 text-base md:text-base mb-4'>Quantity:</p>
        <div className='h-full w-32 ml-3 flex border border-gray-900'>
          <button disabled={counter === 1? true: false} onClick={decrease} className='w-2/6 h-full cursor-pointer border-r border-gray-900'>
            <p className='text-2xl text-red-600'>-</p> 
          </button>
          <div className='w-2/6 h-full text-center pt-2'>
            <p className='text-sm'>{counter}</p>
          </div>
          <button onClick={increase} className='w-2/6 h-full cursor-pointer border-l border-gray-900'>
            <p className='text-2xl text-green-700'>+</p> 
          </button>
        </div>
      </div>

      <button onClick={removeItemToBasket} className=' w-52 button mx-1 text-xs text-purple-700 border border-purple-700'>Remove from Basket</button>

     </div>

    </div>

    <hr className='w-11/12 border-solid border-gray-50' />

    </div>
  )
}

export default CheckoutProduct