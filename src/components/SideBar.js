import { forwardRef, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { HomeIcon, OfficeBuildingIcon, LogoutIcon, UserIcon, ArchiveIcon, SwitchHorizontalIcon, XIcon, ChevronRightIcon, ChevronLeftIcon, HeartIcon } from "@heroicons/react/outline";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { HOME } from "../utils/constant/routesConstants";
import { db } from "../config/firebase";
import categories from "../data/categories";


const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {

  const { user, logOut } = useContext(AuthContext)

  const [searchField, setSearchField] = useState("");
  const [openMenu, setOpenMenu] = useState(false)

  const router = useRouter();

  const signOut = () => {
    try {
      if(user){
        logOut()
      }

      router.push(HOME)
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


  useEffect(() => {
    
    if(searchField){
      try {
        goToSearch()
        setSearchField("")
        setOpenMenu(false)
      } catch (error) {
        setSearchField("")
        setOpenMenu(false)
      }
    }
    
  },[searchField])


  return (
    <div ref={ref} className="fixed w-64 h-screen bg-amazon_blue shadow-sm z-50">

      <div className="absolute top-0 flex justify-center mb-8 z-10">
        <div className="pl-4 pt-4 md:pl-2 md:pt-4">
         <XIcon
          className="h-6 w-6 text-gray-50 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
         /> 
        </div>
        <picture className="cursor-pointer" onClick={() => router.push(HOME)}>
          <img
            className="w-24 max-h-auto pl-2 pt-4"
            src="https://raw.githubusercontent.com/mokssebina/MMNT/master/typhoon-logo-02.png"
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

      <div className="flex justify-center mt-6 mb-14">
        
      </div>
      {!openMenu?
      <div className="flex flex-col">
        
        <div className={`pl-6 py-3 mx-5 rounded lg:hidden text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname == "/"
            ? "text-gray-50"
            : "text-gray-50 hover:bg-gray-800"
          }`} onClick={() => setOpenMenu(true)}>
          <div className="text-gray-50">
            <p>Categories</p>
          </div>
          <div className="absolute right-0 mr-2 text-gray-50">
            <ChevronRightIcon className="max-h-5 w-5" />
          </div>
        </div>
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2 text-gray-50">
              <HomeIcon className="max-h-5 w-5" />
            </div>
            <div className="text-gray-50">
              <p>Home</p>
            </div>
          </div>
        </Link>
        {user &&
        <>
        <Link href="/profile">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/profile"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <UserIcon className="max-h-5 w-5" />
            </div>
            <div>
              <p>Profile</p>
            </div>
          </div>
        </Link>
        <Link href="/wishlist">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/wishlist"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <HeartIcon className="max-h-5 w-5" />
            </div>
            <div>
              <p>Wishlist</p>
            </div>
          </div>
        </Link>
        </>
        }
        <Link href="/real-estate">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center hover:bg-gray-800 cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/real-estate"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <OfficeBuildingIcon className="max-h-5 w-5" />
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
              <SwitchHorizontalIcon className="max-h-5 w-5" />
            </div>
            <div>
              <p>Services</p>
            </div>
          </div>
        </Link>
        <Link href="/leads">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/real-estate"
                ? "bg-black text-gray-50"
                : "text-gray-50 hover:bg-gray-800"
            }`}
          >
            <div className="mr-2">
              <ArchiveIcon className="max-h-5 w-5" />
            </div>
            <div>
              <p>Leads</p>
            </div>
          </div>
        </Link>
        {!user?
        null
        :
        <div onClick={signOut}
         className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
           router.pathname == "/real-estate"
            ? "bg-black text-gray-50"
            : "text-gray-50 hover:bg-gray-800"
         }`}
        >
          <div className="mr-2">
            <LogoutIcon className="max-h-5 w-5" />
          </div>
          <div>
            <p>Logout</p>
          </div>
        </div>
        }
      </div>
      :
      <div className="w-full overflow-y-auto bg-white">
        <div className='w-full h-11 flex flex-row bg-amazon_blue text-gray-50 text-sm p-2 mb-1'>
          <div className="mr-2" onClick={() => setOpenMenu(false)}>
            <ChevronLeftIcon className="max-h-5 w-5" />
          </div>
          <p>Categories</p>
        </div>  

        {categories.map(data => (
          <div key={data.index} 
          className='w-full h-9 text-xs text-gray-900 cursor-pointer hover:bg-amazon_blue hover:text-gray-50 px-2 py-2'
          onClick={() => setSearchField(data.item)}
          >
            <p>{data.item}</p>
          </div>
        ))}

      </div>
      }
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;