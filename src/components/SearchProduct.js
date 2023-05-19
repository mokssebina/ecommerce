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

function SearchProduct({id, title, price, description, category, image}) {

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

    const addItemToBasket = () => {

        const product = {
        id: data.id, 
        title: data.title, 
        price: data.price, 
        description: data.description, 
        category: data.category, 
        image: data.image
    }
        
        //Send the product as an action to the REDUX store
        dispatch(addToBasket(product))
    }
    

    const goToDetails = () => {

      const product = {id, title, price, description, category, image}

      router.push({
      pathname: `/product/${id}`,
      query: {
        myData: JSON.stringify(product)
       }})
    }

  return (
    <div className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white p-3 rounded-sm shadow-sm hover:shadow-lg'>
     <div onClick={goToDetails} className='w-full mx-auto my-5 animate-pulse flex flex-col'>
     {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

      <div className='w-8/12 aspect-square mx-auto'>
       {image &&
        <img className='w-full h-full mx-auto' src={image} objectFit='cover' />
       } 
      </div>

      <div className='w-full p-2'>
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
     </div>
      <button onClick={addItemToBasket} disabled={user? false: true} className='w-full h-9 flex md:h-11 text-white lg:h-12 bg-purple-900 mt-4 hover:bg-purple-700'>
       <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
        <PlusIcon className="h-4 w-4" /> 
        <ShoppingCartIcon className="h-4 w-4" />
        <p className='text-sm'>Add to Cart</p> 
       </div>
      </button>
    </div>
  )
}

export default SearchProduct

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed