import React, { useState } from "react";
import { useRouter } from "next/router";
import { HOME, LOGIN } from "../utils/constant/routesConstants";
import { Tab } from '@headlessui/react'
import SignupForm from "../components/SignupForm";
import MerchantSignupForm from "../components/MerchantSignupForm";
import { withPublic } from "../components/protected-route";
import { Oval } from  'react-loader-spinner'
import { toast, Toaster } from "react-hot-toast";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Signup() {

  const [hideLoading, setHideLoading] = useState(true);

  const router = useRouter();  
    
  const showLoader = () => {
    setHideLoading(false)
  } 

  const hideLoader = () => {
    setHideLoading(true)
  }

  const showSignUpLoader = () => {
    setHideLoading(false)
  }

  const hideSignUpLoader = () => {
    setHideLoading(true)
  }

  return (
  
    <>
    <div hidden={hideLoading} className="relative w-20 h-20 mx-auto my-4">
      <Oval
       height={80}
       width={80}
       color="#7e22ce"
       wrapperStyle={{}}
       wrapperClass=""
       visible={true}
       ariaLabel='oval-loading'
       secondaryColor="#7e22ce"
       strokeWidth={2}
       strokeWidthSecondary={2}
      />
    </div> 
    <div className='w-full h-screen bg-white pt-14 overflow-y-hidden md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden'>
     <h2 className="px-12 mt-4 mb-6 text-center text-2xl font-semibold text-amazon_blue">Sign Up</h2>
     <main className='grid grid-flow-row-dense md:grid-cols-2 w-11/12 mx-auto bg-white'> 
      <div className=" w-full">
       <div className="sign-up-form container w-full md:w-10/12 lg:w-8/12 px-2 mx-auto mb-6">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-amazon_blue p-1">
             <Tab
              className={({ selected }) =>
              classNames(
               'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
               'ring-white ring-opacity-60 ring-offset-2 ring-offset-amazon_blue-light focus:outline-none focus:ring-2',
               selected
               ? 'bg-white shadow text-gray-700'
               : 'text-blue-100 hover:bg-amazon_blue-light hover:text-white'
              )}
              >
               Customer
             </Tab> 
             <Tab
               className={({ selected }) =>
               classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-amazon_blue-light focus:outline-none focus:ring-2',
                selected
                ? 'bg-white shadow text-gray-700'
                : 'text-blue-100 hover:bg-amazon_blue-light hover:text-white'
              )}
             >
               Service Provider
             </Tab>
            </Tab.List>
          <Tab.Panels>
           <Tab.Panel>
            <SignupForm showLoader={showLoader} hideLoader={hideLoader} />    
           </Tab.Panel>
           <Tab.Panel>
            <MerchantSignupForm showSignUpLoader={showSignUpLoader} hideSignUpLoader={hideSignUpLoader} />         
           </Tab.Panel>
          </Tab.Panels>
          </Tab.Group>
        </div>
       </div>
       <div className=" w-full border-l-0 border-t-2 border-amazon_blue md:h-full md:border-t-0 md:border-l-2 md:border-amazon_blue">
        <div className="sign-up-form text-center container md:h-full px-2 pt-8 pb-10 mx-auto sm:w-96 mb-10">
         <div className="relative w-full md:my-20 pt-8 pb-8 items-center justify-center align-middle"> 
          <p className="text-amazon_blue text-lg">
            Sign in
          </p> 
          <p className="mt-2 text-sm text-center text-amazon_blue-light hover:text-blue-900 cursor-pointer"
              onClick={() => router.push(LOGIN)}   
          >
            Already have an account? Click here to Sign in.
          </p>
         </div>
         
        </div>
       </div>
      </main>
     </div> 
    </>
  )
}

export default withPublic(Signup)
