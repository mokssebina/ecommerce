import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel"

function Banner() {
  return (
    <div className='relative'>
      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />  
     <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}
     >
        <div>
         <img className=' object-cover' loading='lazy' src="https://raw.githubusercontent.com/mokssebina/MMNT/master/46847014_749257868793600_389873852408135680_n.jpg" alt="" />   
        </div>

        <div>
         <img className=' object-cover' loading='lazy' src="https://raw.githubusercontent.com/mokssebina/MMNT/master/ppc2.png" alt="" />   
        </div>

        <div>
         <img className=' object-cover' loading='lazy' src="https://raw.githubusercontent.com/mokssebina/MMNT/master/ppc3.jpg" alt="" />   
        </div>

     </Carousel>   
    </div>
  )
}

export default Banner