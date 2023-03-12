import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'



function ListingsUpload({ isOpen, Fragment, createListing, closeModal}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-80 transform overflow-hidden rounded-2xl bg-gray-50 pt-6 px-2 text-left align-middle shadow-xl transition-all">
                  <div className='w-full h-6 flex px-2'>
                   <div className='w-10/12'>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        New Listing
                    </Dialog.Title>
                   </div>
                   <div className='w-2/12'>
                    <XIcon className='absolute right-3 w-5 h-5 cursor-pointer' onClick={closeModal} />
                   </div>
                  </div>  
                  <div className="w-full h-64 mt-2 p-1">

                   <div className='w-full h-14 flex'>
                    <div className='w-9/12 pl-1 pr-2 text-xs font-semibold'>
                     <span>Image</span>  
                     <input type={'file'} accept='image/png, image/jpeg' className='w-full h-10 p-2 mt-1 bg-gray-200 rounded-md' />   
                    </div>
                    <div className='w-3/12 px-1 text-xs font-semibold'>
                     <span>Units</span>  
                     <input placeholder='Units' type={'number'} className='w-full h-10 p-2 mt-1 bg-gray-200 rounded-md' />   
                    </div>
                   </div>  

                   <div className='w-full h-14 flex mt-1 text-xs font-semibold'>
                    <div className='w-9/12 pl-1 pr-2 text-xs font-semibold'>
                     <span>Item</span>  
                     <input placeholder='Item' type={'text'} className='w-full h-10 p-2 mt-1 bg-gray-200 rounded-md' />   
                    </div>
                    <div className='w-3/12 px-1 text-xs font-semibold'>
                     <span>Price(BWP)</span>  
                     <input placeholder='Price' type={'number'} className='w-full h-10 p-2 mt-1 bg-gray-200 rounded-md' />   
                    </div>
                   </div>   

                   <div className='w-full h-20 px-1 text-xs font-semibold mt-1'>
                     <span>Description</span>  
                     <textarea placeholder='Describe the listing' type={'text'} className='w-full h-16 p-2 mt-1 bg-gray-200 rounded-md' />
                   </div>  
                   <div className='w-full h-10 p-1'>
                    <button onClick={createListing} className='w-full h-full mt-2 rounded-md text-xs text-gray-50 bg-amazon_blue'>Create New Listing</button>
                   </div> 
                  </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
    </Transition>
  )
}

export default ListingsUpload