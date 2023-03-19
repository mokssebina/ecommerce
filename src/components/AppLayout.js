import React, { useState, useRef, useContext } from 'react';
import Image from "next/image";
import Link from "next/link";
//import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import  SearchIcon from "@heroicons/react/outline/SearchIcon"
import UserCircleIcon from "@heroicons/react/outline/UserCircleIcon"
import MenuIcon from "@heroicons/react/outline/MenuIcon"
import ShoppingCartIcon from "@heroicons/react/outline/ShoppingCartIcon"
import PresentationChartLineIcon from "@heroicons/react/outline/PresentationChartLineIcon"
import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import Nav from './Nav';
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import { AuthContext } from '../context/AuthContext';
import { REAL_ESTATE, SELLER_PANEL } from '../utils/constant/routesConstants';
import Footer from './Footer';

function AppLayout({ children }) {

  const [isOpen, setIsOpen] = useState(false)

  const [session] = useSession();

  const { user } = useContext(AuthContext)
  const router = useRouter();
  const items = useSelector(selectItems);
  
/*
  const openNav = () => {
    document.body.style.overflow = 'hidden';
  }

  const closeNav = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto';
  }
*/

  const sideBarRef = useRef()
    
  function toggleSideBar() {
    //sideBarRef.current.toggle('-translate-x-full')
  }

  const openMenu = () => {
    if(isOpen === false){
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
  }


  return (
    <>
    <Nav
     ref={sideBarRef}
    />
    
    <header className='relative'>
        {/*Top div*/}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div onClick={() => router.push('/')} className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
              <Image 
                src="https://raw.githubusercontent.com/mokssebina/MMNT/master/jobber-logo.png"
                width={150}
                height={40}
                objectFit='contain' 
                className='cursor-pointer'
              />
            </div>
            {/*Search*/}
            <div className='hidden sm:flex items-center h-10  rounded-md flex-grow cursor-pointer bg-yellow-700 hover:bg-yellow-500'>
              <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
              <SearchIcon className='h-12 p-4 text-white' />  
            </div>
            {/*Right hand side*/}
            <div onClick={() => router.push('/login')} className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
              <div className='link'>
                <p>{!user? `Hi, ${user.displayName}` : 'Sign in'}</p>
                <p className='font-extrabold md:text-sm'>Account & Lists</p>
              </div>

              <div className='link'>
                <p>Returns</p>
                <p className='font-extrabold md:text-sm'>& Orders</p>
              </div>

              <div onClick={() => router.push('/checkout')} className='relative link flex item-center'>
                <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-700 text-center rounded-full text-white font-bold'>
                 {items.length}
                </span>
                <ShoppingCartIcon className='h-10' />
                <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
              </div>

            </div> 

            <div className='items-center h-10 pt-2 pr-1'>
              <UserCircleIcon onClick={openMenu} className='h-6 align-middle cursor-pointer text-gray-100' /> 
            </div>

        </div>

        <div hidden={!isOpen} className='absolute w-2/5 h-36 sm:w-36 sm:h-36 md:w-44 lg:w-44 bg-gray-50 z-30 right-0 rounded-lg p-1'>
         <div className='h-1/3 flex text-gray-900 items-center text-xs space-x-6 hover:bg-gray-200 rounded-lg p-1 cursor-pointer'>
          <UserCircleIcon className='h-5 align-middle' />
          <p>Profile</p> 
         </div> 
         <div onClick={() => router.push(SELLER_PANEL)} className='h-1/3 flex text-gray-900 items-center text-xs space-x-6 hover:bg-gray-200 rounded-lg p-1 cursor-pointer'>
          <PresentationChartLineIcon className='h-5 align-middle' />
          <p>Store Front</p> 
         </div>
         <div className='h-1/3 flex text-gray-900 items-center text-xs space-x-6 hover:bg-gray-200 rounded-lg p-1 cursor-pointer'>
          <LogoutIcon className='h-5 align-middle' />
          <p>Logout</p> 
         </div>
        </div>

        {/*Bottom div*/}
        <div className='flex items-center space-x-3 p-2 pl-6 text-white bg-amazon_blue-light text-sm'>
          <p onClick={toggleSideBar} className='link flex items-center'>
           <MenuIcon className='h-6 mr-1' />
           All
          </p>  
          <p className='link'>Collaborations</p>
          <p className='link'>Rewards</p>
          <p className='link'>Today's Deals</p>
          <p className='link hidden lg:inline-flex'>Construction</p>
          <p className='link hidden lg:inline-flex'>Government Info</p>
          <p className='link hidden lg:inline-flex'>Motor Parts</p>
          <p className='link hidden lg:inline-flex'>Sole Traders</p>
          <p className='link hidden lg:inline-flex'>Contractors/Service Providers</p>
          <p onClick={() => router.push(REAL_ESTATE)} className='link hidden lg:inline-flex'>Real Estate</p>
        </div>
    </header>

    {children}

    {/*<Footer />*/}

    </>
  )
}

export default AppLayout
