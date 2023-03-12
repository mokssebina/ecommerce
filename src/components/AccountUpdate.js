import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import useUser from '../hooks/use-user'


function AccountUpdate({isOpen, Fragment, closeModal}) {

  const [image, setImage] = useState('');

  const { 
    user: { name, email } 
  } = useUser();

  const getImage = (event) => {
    if(event.target.value[0]){
       setImage(event.target.value[0]) 
    }
  } 

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
                <Dialog.Panel className="w-full max-w-md h-96 transform overflow-hidden rounded-2xl bg-gray-50 pt-6 px-2 text-left align-middle shadow-xl transition-all">
                  <div className='w-full h-6 flex px-2'>
                   <div className='w-10/12'>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Profile Update
                    </Dialog.Title>
                   </div>
                   <div className='w-2/12'>
                    <XIcon className='absolute right-3 w-5 h-5 cursor-pointer' onClick={closeModal} />
                   </div>
                  </div>  
                  <div className="w-full h-64 mt-2 p-1">

                    <input type="file" accept=".image/png, image/jpeg, image/jpg" className='h-10' value={image} onChange={getImage} />

                    <div className='relative w-24 h-24 rounded-full mx-auto mt-2 bg-black'>
                     <Image src='https://raw.githubusercontent.com/mokssebina/MMNT/master/jobber-logo.png' width={96} height={96} objectFit='contain' />
                    </div>

                    <div className='w-7/12 mt-4 items-center text-gray-800'>
                     <p className='font-semibold text-lg'>{name}</p>
                     <p className='text-xs'>{email}</p>
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

export default AccountUpdate