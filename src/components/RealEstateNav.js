import React from 'react'
import Link from "next/link";
import XIcon from '@heroicons/react/outline/XIcon'

function RealEstateNav({isOpen, goHome, closeNav}) {
    
  return (
    <>    

    {isOpen && 

    <div>
     <nav className='fixed bg-amazon_blue h-screen w-4/5 overflow-y-auto z-50'>

      <div className='flex border-b mb-3'>

       <div className=' w-10/12'>
       <p className='font-extrabold md:text-sm text-white p-5'>Welcome to Jobber</p>
       </div>

       <div className='w-2/12 p-5'>
        <XIcon onClick={closeNav} className='absolute right-1 h-5 text-white cursor-pointer hover:border rounded-sm' />
       </div>

      </div>  

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <Link href={"/"}>
          <p className='text-white'>Home</p>
        </Link>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <Link href={"/real-estate"}>
          <p className='text-white'>Real Estate</p>
        </Link>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <Link href={"/search"}>
          <p className='text-white'>Search</p>
        </Link>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <Link href={"/search?purpose=for-sale"}>
          <p className='text-white'>Buy Property</p>
        </Link>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <Link href={"/search?purpose=for-rent"}>
          <p className='text-white'>Rent Property</p>
        </Link>
      </div>

     </nav> 
    </div>

    }

    </>
  )
}

export default RealEstateNav
