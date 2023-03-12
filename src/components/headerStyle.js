
import { Fragment } from "react";
import {
  MenuIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  CogIcon,
  BellIcon, 
  CheckIcon,
  UserCircleIcon,
  PencilAltIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  LogoutIcon,
  SearchIcon,
  XIcon
} from "@heroicons/react/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import { CHECKOUT, HOME, LOGIN, SELLER_PANEL } from "../utils/constant/routesConstants";

function TopBar({ showNav, setShowNav }) {

    const items = useSelector(selectItems);
    const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-amazon_blue">
    <div
      className={`w-full h-16 pr-4 bg-amazon_blue flex flex-grow justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >

      <div className="flex justify-center mt-6 mb-8">
        <picture className="cursor-pointer" onClick={() => router.push(HOME)}>
          <img
            className="w-20 h-auto pl-2 pt-4"
            src="https://raw.githubusercontent.com/mokssebina/MMNT/master/jobber-logo.png"
            alt="company logo"
          />
        </picture>
        <div className="pl-4 pt-2 md:pl-2 md:pt-4">
         {!showNav?
         <MenuIcon
          className="h-8 w-8 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         />
         :
         <XIcon
          className="h-8 w-8 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         />}
        </div>
      </div>  

      <div className='hidden w-2/5 sm:flex items-center h-10 ml-8 mr-8 rounded-md cursor-pointer bg-yellow-700 hover:bg-yellow-500'>
       <input disabled={showNav} 
        className={!showNav? `p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4`
        :`p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 bg-gray-300`} type="text" />
       <SearchIcon className='h-12 p-4 text-white' />  
      </div>

      <div hidden={showNav} className="flex items-center md:pr-16 text-gray-50">
         <Popover className="relative">
          <Popover.Button onClick={() => router.push(CHECKOUT)} className="outline-none mr-5 md:mr-8 cursor-pointer flex item-center">
            <span className='md:right-10 h-4 w-4 bg-yellow-700 text-center rounded-full text-white text-xs font-bold'>
             {items.length}
            </span>
            <ShoppingCartIcon className="h-6 w-6" />
          </Popover.Button>
         </Popover>
         <Popover as="div" className="relative inline-block text-left">
           <div>
            <Popover.Button onClick={() => router.push(LOGIN)} className="inline-flex w-full justify-center items-center space-x-2 text-gray-50">
              <UserCircleIcon className='h-5 align-middle' />
              <span className="hidden md:block font-medium ">
                Sign in
              </span>   
            </Popover.Button>
          </div>  
         </Popover>

         <Popover as="div" className="relative inline-block ml-2">
          <div className="mx-auto">
            <Popover.Button className="inline-flex w-full justify-center items-center space-x-2 text-gray-50">
              <ChevronDownIcon className="h-4 w-4" />
            </Popover.Button>
          </div>
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
                  <div className="flex cursor-pointer hover:bg-amazon_blue-light rounded-lg">
                    <div className="rounded-full shrink-0 h-8 w-8 flex items-center justify-center">
                      <PencilAltIcon className="h-4 w-4 text-gray-50" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-50 p-1">
                        Profile
                      </p>
                    </div>
                  </div>
                  <div onClick={() => router.push(SELLER_PANEL)} className="flex cursor-pointer hover:bg-amazon_blue-light rounded-lg">
                    <div className="rounded-full shrink-0 h-8 w-8 flex items-center justify-center">
                      <ShoppingBagIcon className="h-4 w-4 text-gray-50" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-50 p-1">
                        StoreFront
                      </p>
                    </div>
                  </div>
                  <div className="flex cursor-pointer hover:bg-amazon_blue-light rounded-lg">
                    <div className="rounded-full shrink-0 h-8 w-8 flex items-center justify-center">
                      <LogoutIcon className="h-4 w-4 text-gray-50" />
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

    <div className='w-full flex items-center space-x-3 pl-4 pr-4 pt-2 pb-2 sm:hidden md:hidden text-white bg-amazon_blue text-sm'>

       <div className='flex items-center h-10 w-full rounded-md cursor-pointer bg-yellow-700 hover:bg-yellow-500'>
        <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
        <SearchIcon className='h-12 p-4 text-white' />  
       </div>   

    </div>

    <div className={`flex items-center space-x-3 p-2 pl-6 text-white bg-amazon_blue text-sm transition-all duration-[400ms] ${
        showNav ? "sm:pl-56" : ""
      }`}>
     <p className='link'>Collaborations</p>
     <p className='link'>Rewards</p>
     <p className='link'>Today's Deals</p>
    </div>

    </header>
  );
}

export default TopBar