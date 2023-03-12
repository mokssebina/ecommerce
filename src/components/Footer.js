import React from 'react'
import Image from "next/image";


function Footer({goToTop}) {
  return (
    <div className=' absolute w-full bottom-0 z-30'>
     <div onClick={goToTop} className='bg-gray-400 h-10 text-center p-2 cursor-pointer hover:bg-gray-300'>
      <p className=' text-gray-900'>Back to top</p>
     </div>   
     <div className='h-72 bg-amazon_blue-light bottom-0'>
      <div className='absolute flex w-4/5 md:w-2/5 mx-auto bottom-2'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image 
           src="https://raw.githubusercontent.com/mokssebina/MMNT/master/jobber-logo.png"
           width={110}
           height={30}
           objectFit='contain' 
           className='cursor-pointer'
           />
        </div>
       <div className='text-white items-center flex-grow p-4 mt-2'>
        Jobber 2022
       </div>
      </div> 
     </div> 
    </div>
  )
}

export default Footer
