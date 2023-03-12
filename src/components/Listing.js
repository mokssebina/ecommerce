import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'


function Listing() {
  return (
    <div className="w-full mb-2">
      <div className="w-full rounded-lg bg-gray-50 p-1">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <div className='w-9/12 flex justify-between text-xs text-gray-800'>
                 <div>
                  <span>Lasher Shovel</span>
                 </div>
                 <div>
                  <h6>23</h6>
                 </div>
                 <div>
                  <h6>136.65</h6>
                 </div>
                </div>
                <ChevronUpIcon
                  className={`ml-2 ${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-gray-800`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-1 pt-4 pb-2 text-xs text-gray-500 flex">
                <div className='w-9/12'>
                 <p className=' font-semibold'>Description:</p> 
                 <p className='mt-1 mb-2 line-clamp-2'>
                  If you're unhappy with your purchase for any reason, email us
                  within 90 days and we'll refund you in full, no questions asked.
                 </p> 
                </div>
                <div className='w-3/12 flex'>
                 <div className='w-2/4 items-center p-5'>
                  <PencilIcon className='h-5 w-5 mx-auto my-auto cursor-pointer' />
                 </div>
                 <div className='w-2/4 items-center p-5'>
                  <TrashIcon className='h-5 w-5 mx-auto cursor-pointer' />
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

export default Listing