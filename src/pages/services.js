import React, { useState, useEffect, Fragment, useContext } from "react";
import { UserIcon, FolderAddIcon, TrashIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
import { AuthContext } from "../context/AuthContext";
import { useRouter } from 'next/router';
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db, storage } from '../config/firebase'
import toast, { Toaster } from 'react-hot-toast';
import { uploadPicture } from '../../services/firebase';
import { ThreeCircles } from  'react-loader-spinner'
import ServiceFeed from "../components/ServiceFeed";
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';


function Services() {
  
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState('');
  const [pic, setPic] = useState('');
  const [services, setServices] = useState([])
  const [hideLoading, setHideLoading] = useState(true);
  const [filterText, setFilterText] = useState('');


  const { user } = useContext(AuthContext)


  const filteredItems = services.filter(
	item => item.service && item.service.toLowerCase().includes(filterText.toLowerCase())
    ||
    item.companyName && item.companyName.toLowerCase().includes(filterText.toLowerCase()),
  );

  useEffect(() => {
    const getLeads = () => {
      const ref = collection(db, "users")
      const q = query(ref, where("account", "==", "service-provider"))

      onSnapshot(q, (snapshot) => {
       setServices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return getLeads()
  },[])


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
        
      <main className='w-full h-screen lg:w-10/12 max-w-screen-2xl mx-auto bg-white'>

        <header className='w-full bg-white mt-10'>
          <div className='w-full lg:w-full bg-white'>
            <div className='w-full h-12 flex mt-2'>
              <div className='w-9/12 h-full px-2 py-2'>
              <input 
                placeholder='Search' 
                className='w-11/12 ml-1 h-full bg-gray-200 rounded-md md:w-2/4 lg:w-6/12 px-2 border-0'
                value={filterText}
                onChange={e => setFilterText(e.target.value)}             
              />
              </div> 
              <div className='w-3/12 p-2'>
              
              </div> 
            </div> 
          </div>  
          
        </header>

        <div className='w-full h-full mt-5 px-1 pb-2'>
          
          <ServiceFeed services={filteredItems === ""? services: filteredItems} />     

        </div> 

        </main>
     
    </> 
  );
}

export default Services