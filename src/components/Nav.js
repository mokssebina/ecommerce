import React from 'react'
import XIcon from '@heroicons/react/outline/XIcon'

function Nav({isOpen, closeNav}) {
    
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
        <XIcon onClick={closeNav} className='h-5 text-white cursor-pointer hover:border rounded-sm' />
       </div>

      </div>  

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Fasteners</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Reinforced Products</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Trusses</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Fences</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Brick Layering</p>
      </div>

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Interior</p>
      </div>

      <hr className=' border text-white' />

      <div className='p-3 hover:bg-gray-800 cursor-pointer'>
        <p className='text-white'>Motor Parts</p>
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
