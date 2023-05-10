import { Fragment, useContext, useEffect, useState } from "react";
import {
  MenuIcon,
  UserIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  LogoutIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import { CHECKOUT, HOME, LOGIN, ACCOUNT, REAL_ESTATE, SERVICES, LEADS } from "../utils/constant/routesConstants";
import { AuthContext } from "../context/AuthContext";


function TopBar({ showNav, setShowNav }) {

    const items = useSelector(selectItems);
    const router = useRouter();
    const [searchField, setSearchField] = useState("");

    const { user, logOut } = useContext(AuthContext)


    const signOut = () => {
      try {
        if(user){
          logOut()
        }

        router.push(LOGIN)
      }
      catch{
        console.log("users logged out")
      }
    }

    const goToSearch = () => {

      router.push({
      pathname: `/search_results/${searchField}`,
      query: {
        myData: searchField
       }})
    }


  return (
    <header className="top-0 bg-amazon_blue w-full">
      
    <div
      className="w-full lg:w-9/12 max-w-screen-2xl mx-auto max-h-16 pr-4 flex flex-grow justify-between items-center"
    >

      <div className="flex justify-center mt-6 mb-8">
        <div className="pl-4 pt-4 md:pl-2 md:pt-4">
         <MenuIcon
          className="max-h-8 w-8 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         /> 
        </div>
        <picture className="cursor-pointer" onClick={() => router.push(HOME)}>
          <img
            className="w-24 h-auto pl-2 pt-4"
            src=""
            alt=""
          />
        </picture>
        {/*<div className="pl-4 pt-2 md:pl-2 md:pt-4">
         <XIcon
          className="h-8 w-8 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         />
        </div>*/}
      </div>  

      <div className='hidden w-1/4 sm:flex items-center h-10 ml-10 mr-10 rounded-md flex-grow cursor-pointer bg-purple-900 hover:bg-purple-500'>
       <input
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4`" type="text"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
       />
       <SearchIcon onClick={goToSearch} className='h-12 p-4 text-white' />  
      </div>

      <div className="flex items-center md:pr-16 text-gray-50">
         <Popover as="div" className="relative">
          <Popover.Button onClick={() => router.push(CHECKOUT)} className="outline-none mr-5 md:mr-8 cursor-pointer flex item-center">
            <span className='md:right-10 max-h-4 w-4 bg-purple-900 text-center rounded-full text-white text-xs font-bold'>
             {items.length}
            </span>
            <ShoppingCartIcon className="max-h-6 w-6" />
          </Popover.Button>
         </Popover>
         <Popover as="div" className="relative inline-block text-left">
            <Popover.Button onClick={user? null : () => router.push(LOGIN)} className="outline-none mr-5 md:mr-8 cursor-pointer flex items-center text-gray-50">
              {user?.displayPicture ?
              <Image src={`${user?.displayPicture}`} className="rounded-full relative mr-1 mx-auto" width={24} height={24} objectFit='contain' />
              :
              <UserCircleIcon className='relative max-h-6 w-6 mr-1 mx-auto' />}
              <span className="hidden md:block font-medium ml-1">
                {user? user?.displayName : "Sign in"}
              </span>   
            </Popover.Button>
         </Popover>

         <Popover as="div" className="relative items-center inline-block ml-2">
           <Popover.Button className="outline-none cursor-pointer flex items-center text-gray-50">
            <ChevronDownIcon className="max-h-4 w-4" />
           </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Popover.Panel className="absolute right-0 sm:right-1 z-50 mt-2 bg-amazon_blue shadow-sm rounded max-w-xs sm:max-w-sm w-48">
              <div className="relative p-3">
                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                  <div onClick={() => router.push(ACCOUNT)} className="flex cursor-pointer hover:bg-amazon_blue-light rounded-lg">
                    <div className="rounded-full shrink-0 max-h-8 w-8 flex items-center justify-center">
                       <UserIcon className="max-h-4 w-4 text-gray-50" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-50 p-1">
                        Profile
                      </p>
                    </div>
                  </div>
                  <div onClick={signOut} className="flex cursor-pointer hover:bg-amazon_blue-light rounded-lg">
                    <div className="rounded-full shrink-0 max-h-8 w-8 flex items-center justify-center">
                      <LogoutIcon className="max-h-4 w-4 text-gray-50" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-50 p-1">
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>

    </div>

    <div className='w-full mx-auto flex items-center space-x-3 pl-4 pr-4 pt-2 pb-2 sm:hidden text-white bg-amazon_blue text-sm'>

      <div className='flex items-center h-10 w-full rounded-md cursor-pointer bg-purple-900 hover:bg-purple-500'>
        <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
        <SearchIcon className='h-12 p-4 text-white' />  
      </div>   

    </div>

    <div className="w-full lg:w-9/12 max-w-screen-2xl mx-auto flex items-center space-x-3 p-2 pl-6 text-white bg-amazon_blue text-sm">
     <p onClick={() => router.push(REAL_ESTATE)} className='link'>Real Estate</p>
     <p onClick={() => router.push(SERVICES)} className='link'>Services</p>
     <p onClick={() => router.push(LEADS)} className='link'>Leads</p>
    </div>

    </header>
  );
}

export default TopBar