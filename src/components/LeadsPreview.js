import React, { useState, useEffect, Fragment, useContext } from "react";
import { UserIcon, FolderAddIcon, TrashIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
import { AuthContext } from "../context/AuthContext";
import { withProtected } from "./protected-route";
import {
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  query, 
  where,
  collection,
  onSnapshot
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../config/firebase'
import toast, { Toaster } from 'react-hot-toast';
import { uploadPicture } from '../../services/firebase';
import { ThreeCircles } from  'react-loader-spinner'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';


const columns = [
  {
    name: "Company",
    selector: row => row.organisation,
  },
  {
    name: "Email",
    selector: row => row.email
  },
  {
    name: "Title",
    selector: row => row.title
  },
  {
      name: 'Tender Number',
      selector: row => row.tenderNumber,
  },
]



function LeadsTable() {
  
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState('');
  const [pic, setPic] = useState('');
  const [leads, setLeads] = useState([])
  const [hideLoading, setHideLoading] = useState(true);
  const [filterText, setFilterText] = useState('');


  const { user } = useContext(AuthContext)

  const ExpandedComponent = ({ data }) => {
    return (
      <div className='w-full px-1 pt-4 pb-2 text-xs text-gray-500 flex'>
        <div className='w-1/6 p-1'>
        <a href={data.supportDoc} target="_blank" className="text-blue-400 underline" rel="noopener noreferrer">Preview Doc</a>
        </div>
        <div className='w-3/6 p-1'>
         <p className=' font-semibold'>Description:</p> 
         <p className='mt-1 mb-2 line-clamp-4'>
         {data.description}
         </p> 
        </div>
        <div className='w-1/6 p-1'>
         <p className=' font-semibold'>Category:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
          {data.category}
         </p> 
        </div>
        <div className='w-1/6 flex'>
         <div className='w-2/4 items-center p-5'>
         {/*<PencilIcon className='h-5 w-5 mx-auto my-auto cursor-pointer' />*/}
         </div>
         <div className='w-2/4 items-center p-5'>
          <ArrowsExpandIcon onClick={""} 
           className='h-5 w-5 mx-auto cursor-pointer' />
         </div>
        </div>
      </div>
    )
  };

  const filteredItems = leads.filter(
	item => item.item && item.item.toLowerCase().includes(filterText.toLowerCase())
    ||
    item.category && item.category.toLowerCase().includes(filterText.toLowerCase()),
  );

  


  return (
    <>
     <div hidden={hideLoading} className="fixed w-screen h-screen z-50 md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden">
      <div className="relative w-20 h-20 mx-auto mt-60 z-50">
        <ThreeCircles
          height="80"
          width="80"
          color="#131921"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div> 
     </div>
        
      <main className='w-full h-screen lg:w-full bg-white'>

        <header className='w-full bg-white mt-10'>
          <div className='w-full lg:w-full bg-white'>
            <div className='w-full h-12 flex mt-2'>
              <div className='w-9/12 h-full px-2 py-2'>
               <p>Preview</p>
              </div> 
              <div className='w-3/12 p-2'>
              
              </div> 
            </div> 
          </div>  
          
        </header>

        <div className='w-full h-full mt-5 px-1 pb-2'>
          
                 

        </div> 

        </main>
     
    </> 
  );
}

export default LeadsTable