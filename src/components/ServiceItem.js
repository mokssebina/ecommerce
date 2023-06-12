import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { ArrowsExpandIcon } from '@heroicons/react/outline'
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function ServiceItem({id, companyName, account, bio, displayPicture, email, service, userId}) {

    const [field, setField] = useState("")

    const dispatch = useDispatch();
    const router = useRouter();

/*
    const addItemToBasket = () => {
      const product = {id, title, price, description, category, image}
      
      //Send the product as an action to the REDUX store
      dispatch(addToBasket(product))
    }
*/
    

    const goToDetails = () => {

      const data = {companyName, account, bio, displayPicture, email, service, userId}  

      router.push({
      pathname: `/service-preview/${userId}`,
      query: {
        myData: JSON.stringify(data)
       }})
    }

    useEffect(() => {

        if(field){
          try {
            goToDetails()
            setField("")
          } catch (error) {
            setField("")
          }
        }
        
    },[field])

  return (
     
    <div className='relative w-11/12 aspect-[3/4] mx-auto my-2 bg-white p-3 rounded-md shadow-sm hover:shadow-lg border border-purple-700'>
     <div onClick={goToDetails} className='w-full mx-auto flex flex-col'>
     {/*<p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>*/}

      <div className='w-6/12 aspect-square mx-auto mb-2 rounded-full'>
       {displayPicture &&
        <img className='w-full h-full mx-auto rounded-full' src={displayPicture} objectFit='cover' />
       } 
      </div>

      <div className='w-full h-1 mt-3 bg-purple-700'></div>

      <div className='w-full p-1 space-y-1'>

        <h4 className='my-1 line-clamp-1 font-semibold'>{companyName}</h4>
       
        <h4 className='my-1 line-clamp-1 font-semibold'>{service}</h4>
        
        <h4 className='my-1 line-clamp-1 font-semibold'>{email}</h4>
        
      </div>
      
     </div>
      
      <button onClick={goToDetails} 
       className='w-full h-9 flex text-white bg-purple-700 mt-4 hover:bg-purple-900'>
       <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
        <ArrowsExpandIcon className="h-4 w-4" />
        <p className='text-sm'>Preview</p> 
       </div>
      </button>
      <p className='hidden'>{id}</p>
      <p className='hidden'>{account}</p>
      <p className='hidden'>{bio}</p>
      <p className='hidden'>{userId}</p>
    </div>
    
  )
}

export default ServiceItem

//flex-1 bg-tribal bg-no-repeat bg-cover bg-center bg-fixed