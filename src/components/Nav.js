import React from 'react'
import Link from "next/link";
import XIcon from '@heroicons/react/outline/XIcon'

function Nav({isOpen, goHome, closeNav, pickTools, pickFoundation, pickAdhesive, pickFencing, pickGeyser, pickPaint}) {
    
  return (
    <>    

    {isOpen && 

    <div>
     <nav className='fixed bg-amazon_blue h-screen sm:w-4/5 lg:w-2/5 overflow-y-auto z-50'>

      <div className='flex border-b mb-3'>

       <div className=' w-10/12'>
       <p className='font-extrabold md:text-sm text-white p-5'>Welcome to Jobber</p>
       </div>

       <div className='w-2/12 p-5'>
        <XIcon className='absolute right-1 h-5 text-white cursor-pointer hover:border rounded-sm' />
       </div>

      </div>  

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Home</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Tools</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Foundation</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Adhesives</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Fencing</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Geysers</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Paint</p>
      </div>

      <hr className=' border text-white' />

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <Link href={"/real-estate"}>
          <p className='text-white'>Real Estate</p>
        </Link>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Sole Traders</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Contractors/Service Providers</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Clothing</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Car Dealers</p>
      </div>

     </nav> 
    </div>

    }

    </>
  )
}

export default Nav
