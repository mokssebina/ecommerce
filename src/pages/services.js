import React from 'react';
//import { Select, Option } from "@material-tailwind/react";

function Services() {

    const services = [
        {key:1, value: "agriculture", item: "Agricultural Services"},
        {key:2, value: "construction", item: "Construction"},
        {key:3, value: "engineering", item: "Engineering"},
        {key:4, value: "farming", item: "Farming"},
        {key:5, value: "food", item: "Food/Produce"},
        {key:6, value: "ict", item: "IT Services"},
        {key:7, value: "medical", item: "Medical Services"},
        {key:8, value: "retail", item: "Retail"},
        {key:9, value: "supplier", item: "Supplier"},
      ];

  return (
    <div className='w-full h-screen bg-white overflow-hidden'>
        
     <header className='fixed w-full h-24 shadow-md z-20 px-2 bg-white'>
      <div className="w-full md:w-7/12 lg:w-6/12 mt-6 mx-auto mb-4">
	   <div className="flex items-center justify-between">
	    <label htmlFor="" className="block mb-2 font-sans text-sm text-gray-900">
		 Available Services
		</label>
	   </div>
		<>
         <select 
          className={`border border-solid rounded-sm ring:0 focus:ring-0 focus:outline-none border-gray-700 text-gray-500 text-normal py-1 h-8 px-2 text-sm w-full flex items-center`}
         >
          {services.map((service) => (
           <option className="text-sm text-gray-900" value={service.value}>{service.item}</option>
          ))}                          
         </select>
		</>
	   </div>  
     </header>
        
     <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

     <div className='w-full h-full mt-32 px-2 pb-2'>
      <p className='text-md text-gray-700'>
        There are no services available at the moment.
      </p>
     </div>  

     </main>

    </div>
  )
}

export default Services