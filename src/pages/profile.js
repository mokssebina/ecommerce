import React, { useState, useEffect, Fragment } from "react";
import { UserIcon } from '@heroicons/react/outline'
import OrderItem from "../components/OrderItem";
import AccountUpdate from "../components/AccountUpdate";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/protected-route";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";


export default function Profile({ children }) {
  
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useAuth()

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }


  return (
     <ProtectedRoute>
      <AccountUpdate isOpen={isOpen} Fragment={Fragment} closeModal={closeModal} />
      <div className='w-full h-screen bg-white overflow-hidden'>
        
        <header className='fixed w-full shadow-md z-20 bg-white'>
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
          <div className='w-full h-10 flex mt-2'>
            <div className='w-9/12 px-1 py-1'>
            <input placeholder='Search' className='w-11/12 ml-1 h-full bg-gray-200 rounded-md md:w-2/4 lg:w-6/12 px-1 border-0' />
            </div> 
            <div className='w-3/12 p-2'>
            
            </div> 
          </div> 
          </div>  
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto h-14 bg-white relative z-10 mb-2'>
          
          <div className='w-9/12 h-full flex justify-between items-center text-sm font-semibold text-gray-800'>
            
            <div className='items-center ml-2'>
              <span>ID</span>
            </div>
            <div className='items-center ml-16'>
              <span>Date</span>
            </div>
            <div className='items-center'>
              <span>Total(BWP)</span>
            </div>

          </div>

          </div>
        </header>
        
        <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

        <div className='w-full h-full mt-32 px-1 pb-2'>
          
          <OrderItem />    
          <OrderItem />       
          <OrderItem />       

        </div> 

        </main>
      </div>

     <div onClick={openModal} className="fixed w-11 h-11 rounded-full left-3 bottom-3 bg-gray-300 cursor-pointer hover:bg-gray-400 shadow-md">
      <UserIcon className="w-5 h-5 mx-auto mt-3" />
     </div>
    </ProtectedRoute> 
  );
}


