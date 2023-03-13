import React, { useState } from 'react'
import Header from '../components/AppLayout'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { useAuth } from '../context/AuthContext';
import Currency from 'react-currency-formatter';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/protected-route';


function Checkout() {

  const imageurl = 'https://raw.githubusercontent.com/mokssebina/MMNT/master/13-134808-paypal-credit-card-logo-png-paypal-visa-mastercard.jpg'
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)

  const { user } = useAuth()

  /*const [session] = useSession();

  if(!session) {
    console.log("There is no ongoing session")
  }
  */

  return (
      <div className='w-full h-screen bg-gray-50 pt-5 px-4 overflow-y-hidden md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden'>

        <main className='lg:flex max-w-screen-2xl mx-auto bg-white'>

          <div className='flex-grow shadow-sm'>
          <Image src={imageurl} height={250} width={1020} objectFit='contain' />

          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>{items.length === 0 ? "Your basket is empty": "Shopping Basket"}</h1>
          </div>

          {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
              />
          ))}

          </div>

          {items.length > 0 && 
          <div className='flex flex-col bg-white p-10 shadow-md'>
            <>
              <h2 className='whitespace-nowrap'>
                Total ({items.length} items): {""}
                <span className='font-bold'>
                <Currency quantity={total} currency="BWP" />
                </span>
              </h2>
                
              <button
              disabled={!user}
              className={`button mt-2 ${!user && " from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"} text-white text-xs`}>
                {!user? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          </div>
          }
        </main>
      </div>
  )
}

export default Checkout

