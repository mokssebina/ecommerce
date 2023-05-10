import React, {useState} from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function Product({id, title, price, description, category, image}) {

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

      const product = {id, title, price, description, category, image}

      router.push({
      pathname: `/product/${id}`,
      query: {
        myData: JSON.stringify(product)
       }})
    }

  return (
    <div onClick={goToDetails} className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white z-20 p-3 rounded-sm shadow-sm hover:shadow-lg'>
     <div className='w-full mx-auto my-5 flex flex-col'>
     {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

      {image &&
      <Image className='mx-auto my-auto' src={image} height={200} width={200} objectFit='contain' />
      }

      <h4 className='my-3 line-clamp-1'>{title}</h4>
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
      <div className='mb-5'>

      <Currency quantity={price} currency="BWP" />  

      </div>

      {/*hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src="https://links.papareact.com/fdw" alt="" />  
          <p className='text-xs text-gray-500'>Free delivery within Gaborone</p>
        </div>
      )*/}

      {/*<button onClick={addItemToBasket} className='mt-auto button bg-yellow-700 text-white'>Add to Basket</button>*/}
     </div>
    </div>
  )
}

export default Product

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed