import React, { useState, useEffect, Fragment } from 'react'
import Listing from '../components/Listing'
import { FolderAddIcon } from '@heroicons/react/outline'
import ListingsUpload from '../components/ListingsUpload';
import ProtectedRoute from '../components/protected-route';

function Listings() {
  
  const [listings, setListings] = useState([]);
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
/*
  useEffect(
    () =>
      onSnapshot(collection(db, "listings"), (snapshot) =>
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
*/
  return (
    <ProtectedRoute>
      <ListingsUpload isOpen={isOpen} Fragment={Fragment} closeModal={closeModal} />

        <div className='w-full h-screen bg-white overflow-hidden'>
        
        <header className='fixed w-full shadow-md z-20 bg-white'>
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
            <div className='w-full h-10 flex mt-2'>
              <div className='w-9/12 px-1 py-1'>
                <input placeholder='Search' className='w-11/12 ml-1 h-full bg-gray-200 rounded-md md:w-2/4 lg:w-6/12 px-1 border-0' />
              </div> 
              <div className='w-3/12 p-2'>
                <FolderAddIcon onClick={openModal} className='w-7 h-7 cursor-pointer mx-auto' />
              </div> 
            </div> 
            </div>  
            <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto h-14 bg-white relative z-10 mb-2'>
            
            <div className='w-9/12 h-full flex justify-between items-center text-sm font-semibold text-gray-800'>
              
              <div className='items-center ml-2'>
                <span>Item</span>
              </div>
              <div className='items-center ml-16'>
                <span>Unit</span>
              </div>
              <div className='items-center'>
                <span>Price(BWP)</span>
              </div>

            </div>

          </div>
        </header>
        
        <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

        <div className='w-full h-full mt-32 px-1 pb-2'>
          
          <Listing />    
          <Listing />       
          <Listing />       

        </div> 

        </main>
      </div> 
   </ProtectedRoute>
  )
}

export default Listings