import React, {useState} from 'react'
import Image from 'next/image'
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function CheckoutProduct({id, title, price, description, category, image}) {

    const dispatch = useDispatch();

    const MAX_RATING = 5;
    const MIN_RATING = 1;
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING)

    const addItemToBasket = () => {
      const product = {id, title, price, description, category, image}

      //Send the product as an action to the REDUX store
      dispatch(addToBasket(product))
    }

    const removeItemToBasket = () => {
      const product = {id, title, price, description, category, image}
      //Remove item from REDUX
      dispatch(removeFromBasket({ id }))
    }

  return (
    <div className=' mb-2 p-1 rounded-lg bg-white'>
    <div className='grid grid-cols-5'>
     <Image src={image} height={200} width={200} objectFit="contain" />

     <div className='col-span-4 ml-5 mr-2'>

      <p>{title}</p>  

      <div className='flex'>
      {Array(rating).fill().map((_,i) => (
         <StarIcon key={i} className='h-5 text-yellow-500' />
       ))}
      </div>

      <p className='text-xs mt-2 mb-2 line-clamp-3'>{description}</p>

      <Currency quantity={price} currency="BWP" />

     </div>

    </div>

    <div className='flex flex-col-2 p-1 my-auto mx-auto justify-self-end text-white'>
      <button onClick={addItemToBasket} className='button mx-1 text-xs'>Add to Basket</button>
      <button onClick={removeItemToBasket} className='button mx-1 text-xs'>Remove from Basket</button>
    </div>

    <hr className='w-11/12 border-solid border-gray-50' />

    </div>
  )
}

export default CheckoutProduct