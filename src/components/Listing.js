import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { withProtected } from './protected-route'


function Listing({thumbnail, item, units, price, category, description, deleteListing}) {
  return (
    <div className="w-full mb-2">
      <div className="w-full rounded-lg bg-gray-50 p-1">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full h-12 justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <div className='w-9/12 flex justify-between text-xs text-gray-800'>
                 <div className='flex'>
                  <div className='w-8 h-8 bg-black mr-2'>
                    <img
                      className="w-full h-auto"
                      src={`${thumbnail}`}
                      objec
                      alt="listing image"
                    /> 
                  </div>
                  <span className=' mt-2 line-clamp-1'>{item}</span>
                 </div>
                 <div>
                  <h6 className=' mt-2'>{units}</h6>
                 </div>
                 <div>
                  <h6 className=' mt-2'>{price}</h6>
                 </div>
                </div>
                <ChevronUpIcon
                  className={`ml-2 ${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-gray-800`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-1 pt-4 pb-2 text-xs text-gray-500 flex">
                <div className='w-2/4 p-1'>
                 <p className=' font-semibold'>Description:</p> 
                 <p className='mt-1 mb-2 line-clamp-2'>
                  {description}
                 </p> 
                </div>
                <div className='w-1/4 p-1'>
                 <p className=' font-semibold'>Category:</p> 
                 <p className='mt-1 mb-2 line-clamp-2'>
                  {category}
                 </p> 
                </div>
                <div className='w-1/4 flex'>
                 <div className='w-2/4 items-center p-5'>
                  {/*<PencilIcon className='h-5 w-5 mx-auto my-auto cursor-pointer' />*/}
                 </div>
                 <div className='w-2/4 items-center p-5'>
                  <TrashIcon onClick={deleteListing} className='h-5 w-5 mx-auto cursor-pointer' />
                 </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default withProtected(Listing)