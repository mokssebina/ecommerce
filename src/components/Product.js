import React, {useState} from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
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

      const product = {id, title, price, description, category, image, productId, store, userId}

      router.push({
      pathname: `/product/${id}`,
      query: {
        myData: JSON.stringify(product)
       }})
    }

  return (
    <div onClick={goToDetails} className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white p-3 rounded-sm shadow-sm hover:shadow-lg'>
     <div className='w-full mx-auto my-5 animate-pulse flex flex-coltoast'>
     {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

      <div className='w-8/12 aspect-square mx-auto bg-gray-100'>
       {image &&
        <img className='w-full h-full mx-auto' src={image} objectFit='cover' />
       } 
      </div>

      <div className='absolute w-full bottom-0 py-2'>
       <h4 className='my-1 line-clamp-1'>{title}</h4>
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
       <div className='mt-2'>

        <Currency quantity={price} currency="BWP" />  

       </div>
      </div>

      {/*hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src="https://links.papareact.com/fdw" alt="" />  
          <p className='text-xs text-gray-500'>Free delivery within Gaborone</p>
        </div>
      )*/}

      {/*<button onClick={addItemToBasket} className='mt-auto button bg-yellow-700 text-white'>Add to Basket</button>*/}
      <p className='hidden'>{productId}</p>
      <p className='hidden'>{brandName}</p>
      <p className='hidden'>{store}</p>
      <p className='hidden'>{userId}</p>
     </div>
    </div>
  )
}

export default Product

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed