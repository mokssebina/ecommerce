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
         <img loading='lazy' src="https://raw.githubusercontent.com/mokssebina/MMNT/master/PPC-Bag-Delivery-Banners-12.jpg" alt="" />   
        </div>

        <div>
         <img loading='lazy' src="https://raw.githubusercontent.com/mokssebina/MMNT/master/ppc2.png" alt="" />   
        </div>

        <div>
         <img loading='lazy' src="https://raw.githubusercontent.com/mokssebina/MMNT/blob/master/ppc3.jpg" alt="" />   
        </div>

     </Carousel>   
    </div>
  )
}

export default Banner