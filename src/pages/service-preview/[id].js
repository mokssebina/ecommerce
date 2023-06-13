import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//import { Select, Option } from "@material-tailwind/react";


function Preview() {

    const [data, setData] = useState({})

    document.body.style.backgroundColor = "#ffffff";

    const router = useRouter();
    const { myData } = router.query;

    useEffect(() => {
        const getDetails = () => {
          if (myData) setData(JSON.parse(myData));

          console.log("product data: ",myData)
        }

        return getDetails()

    }, [router.query]);


  return (
    <main className='w-full h-screen lg:w-10/12 max-w-screen-2xl pt-10 mx-auto bg-white'>
      <main className='w-full h-screen lg:w-full bg-white'>

          <header className='w-full bg-white mt-10'>
            <div className='w-full lg:w-full bg-white'>
              <div className='w-full h-12 flex mt-2'>
                <div className='w-9/12 h-full px-2 py-2 text-xl font-semibold'>
                  <p>Preview</p>
                </div> 
                <div className='w-3/12 p-2'>
                
                </div> 
              </div> 
            </div>  
            
          </header>

          <div className='w-full h-full mt-5 px-1 pb-2'>
            
           <div className='w-full h-full flex flex-col'>
             
             <div className='w-full flex flex-col md:flex-row space-y-2'>
                <div className='w-full md:w-1/3 p-1'>
                 <div className='w-12 h-12 border-2 border-amazon_blue rounded-full'>
                   <img className='w-full h-full rounded-full' src={data.displayPicture} />
                 </div> 
               </div> 
               <div className='w-full md:w-1/3 p-1'>
                 <p className=' font-semibold'>Company Name:</p> 
                 <p>{data.companyName}</p> 
               </div>
               <div className='w-full md:w-1/3 p-1'>
                 <p className=' font-semibold'>Service:</p> 
                 <p>{data.service}</p>
               </div>
             </div>
             <div className='w-full h-full flex flex-col md:flex-row space-y-2'>
               <div className='w-full md:w-4/6 p-1'>
                <p className=' font-semibold'>About:</p> 
                <p>{data.bio}</p> 
               </div>
               <div className='w-full flex flex-col md:w-2/6 space-y-2'>
                 <div className='w-full p-1'>
                    <p className='font-semibold'>email:</p> 
                    <p>{data.email}</p> 
                 </div> 
               </div> 
             </div>

           </div>         

          </div> 

        </main>
    </main>
  )
}

export default Preview