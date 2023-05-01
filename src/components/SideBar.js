import { forwardRef, useContext } from "react";
import Link from "next/link";
import {
  MenuIcon
} from "@heroicons/react/outline";
import { HomeIcon, OfficeBuildingIcon, CreditCardIcon, UserIcon, ArchiveIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";


const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {

  const { user } = useContext(AuthContext)

  const router = useRouter();


  return (
    <div ref={ref} className="fixed w-56 h-screen bg-amazon_blue shadow-sm z-50">

      <div className="absolute top-0 flex justify-center mb-8 z-10">
        <div className="pl-4 pt-4 md:pl-2 md:pt-4">
         <MenuIcon
          className="h-8 w-8 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         /> 
        </div>
        <picture className="cursor-pointer" onClick={() => router.push(HOME)}>
          <img
            className="w-24 h-auto pl-2 pt-4"
            src="https://raw.githubusercontent.com/mokssebina/MMNT/master/jobber-logo.png"
            alt="company logo"
          />
        </picture>
        {/*<div className="pl-4 pt-2 md:pl-2 md:pt-4">
         <XIcon
          className="h-8 w-8 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         />
        </div>*/}
      </div>

      <div className="flex justify-center mt-6 mb-14">
        
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2 text-gray-50">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div className="text-gray-50">
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/profile"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Profile</p>
            </div>
          </div>
        </Link>
        {user?.account === "service-provider" &&
         <Link href="/listings">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/listings"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Listings</p>
            </div>
          </div>
        </Link>}
        <Link href="/real-estate">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/real-estate"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <OfficeBuildingIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Real Estate</p>
            </div>
          </div>
        </Link>
        <Link href="/services">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/real-estate"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <SwitchHorizontalIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Services</p>
            </div>
          </div>
        </Link>
        <Link href="/tenders">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/real-estate"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <ArchiveIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Tenders</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;