import React from 'react';
import LeadsTable from "../components/LeadsTable"
//import { Select, Option } from "@material-tailwind/react";


function Tenders() {

  document.body.style.backgroundColor = "#ffffff";
    
  return (
    <main className='w-full h-screen lg:w-10/12 max-w-screen-2xl pt-10 mx-auto bg-white'>
      <LeadsTable />
    </main>
  )
}

export default Tenders