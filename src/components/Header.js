import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
//import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import  SearchIcon from "@heroicons/react/outline/SearchIcon"
import MenuIcon from "@heroicons/react/outline/MenuIcon"
import ShoppingCartIcon from "@heroicons/react/outline/ShoppingCartIcon"
import Nav from './Nav';
import { signIn, signOut, useSession } from 'next-auth/client'

function Header({goHome, menu, openMenu, closeNav, pickTools, pickFoundation, pickAdhesive, pickFencing, pickGeyser, pickPaint}) {

  const [isOpen, setIsOpen] = useState(false)
/*
  const openNav = () => {
    document.body.style.overflow = 'hidden';
  }

  const closeNav = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto';
  }
*/
  return (
    <>
    {/*Navbar*/}
    <Nav
     isOpen={menu? false: true}
     closeNav={closeNav} 
     goHome={goHome}
     pickTools={pickTools} 
     pickFoundation={pickFoundation} 
     pickAdhesive={pickAdhesive} 
     pickFencing={pickFencing} 
     pickGeyser={pickGeyser} 
     pickPaint={pickPaint}
    />

    <header className='relative'>
        {/*Top div*/}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div onClick={goHome} className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
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
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
              <div className='link'>
                <p>Hello Moks</p>
                <p className='font-extrabold md:text-sm'>Account & Lists</p>
              </div>

              <div className='link'>
                <p>Returns</p>
                <p className='font-extrabold md:text-sm'>& Orders</p>
              </div>

              <div className='relative link flex item-center'>
                <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-700 text-center rounded-full text-white font-bold'>0</span>
                <ShoppingCartIcon className='h-10' />
                <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
              </div>
            </div>    
        </div>

        {/*Bottom div*/}
        <div className='flex items-center space-x-3 p-2 pl-6 text-white bg-amazon_blue-light text-sm'>
          <p onClick={openMenu} className='link flex items-center'>
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
          <Link href={"/real-estate"}>
            <p className='link hidden lg:inline-flex'>Real Estate</p>
          </Link>
        </div>
    </header>

    </>
  )
}

export default Header
