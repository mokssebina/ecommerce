import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
//import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import  SearchIcon from "@heroicons/react/outline/SearchIcon"
import MenuIcon from "@heroicons/react/outline/MenuIcon"
import ShoppingCartIcon from "@heroicons/react/outline/ShoppingCartIcon"
import RealEstateNav from './RealEstateNav';
import { signIn, signOut, useSession } from 'next-auth/client'

function RealEstateHeader({menu, openMenu, closeNav}) {

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
    <RealEstateNav
     isOpen={menu? false: true}
     closeNav={closeNav} 
    />

    <header className='relative'>
        {/*Top div*/}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
              <Link href={"/"}>  
                <Image 
                 src="https://raw.githubusercontent.com/mokssebina/MMNT/master/jobber-logo.png"
                 width={150}
                 height={40}
                 objectFit='contain' 
                 className='cursor-pointer'
                />
              </Link>
            </div>
            {/*Right hand side*/}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
              <Link href={"/real-estate"}>
                <p className='link hidden lg:inline-flex'>Real Estate</p>
              </Link>
              <Link href={"/search"}>
                 <p className='link hidden lg:inline-flex'>Search</p>
              </Link>
              <Link href={"/search?purpose=for-sale"}>
                 <p className='link hidden lg:inline-flex'>Buy Property</p>
              </Link>
              <Link href={"/search?purpose=for-rent"}>
                 <p className='link hidden lg:inline-flex'>Rent Property</p>
              </Link>
            </div>    
        </div>

        {/*Bottom div*/}
        <div className='flex items-center space-x-3 p-2 pl-6 text-white bg-amazon_blue-light text-sm'>
          <p onClick={openMenu} className='link flex items-center'>
           <MenuIcon className='h-6 mr-1' />
           All
          </p> 
        </div>
    </header>

    </>
  )
}

export default RealEstateHeader
