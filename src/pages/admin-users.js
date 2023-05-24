import React, { useState, useEffect, Fragment, useContext, useMemo } from 'react'
//import MaterialTable from 'material-table'
import Listing from '../components/Listing'
import { FolderAddIcon } from '@heroicons/react/outline'
import ListingsUpload from '../components/ListingsUpload';
import {
  addDoc,
  arrayUnion,
  doc,
  deleteDoc,
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
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../config/firebase';
import { ThreeCircles } from  'react-loader-spinner'
import { Table, Pagination } from 'rsuite';
import { XIcon, CheckIcon, TrashIcon, PauseIcon } from '@heroicons/react/outline'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';


const columns = [
  {
    name: "Name",
    selector: row => row.displayName,
  },
  {
    name: "Account Type",
    selector: row => row.account
  },
  {
      name: 'Email',
      selector: row => row.email,
  },
  {
    name: 'Date Created',
    selector: row => row.createdDate,
  },
]


function Users() {
  
  const [users, setUsers] = useState([{}]);
  const [isOpen, setIsOpen] = useState(false)
  const [hideLoading, setHideLoading] = useState(true);
  const [filterText, setFilterText] = useState('');


  const { user } = useContext(AuthContext)

  const approveUser = async (userID) => {
    const userRef =  doc(db, "users", `${userID}`)

    await updateDoc(userRef, {
       status: "apporved"
    });
  }

  const rejectUser = async (userID) => {
    const userRef =  doc(db, "users", `${userID}`)

    await updateDoc(userRef, {
       status: "pending"
    });
  }


  const ExpandedComponent = ({ data }) => {
    return (
      <div className='w-full px-1 pt-4 pb-2 text-xs text-gray-500 flex'>
        <div className='w-1/6 p-1'>
         <img className='w-3/5 h-auto mx-auto' src={data.displayPicture} />
        </div>
        <div className='w-2/6 p-1'>
        {data.account === "customer"?
        <>
         <p className=' font-semibold'>Account Name(s):</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.firstName}
         </p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.lastName}
         </p>
        </> 
        :
        <>
         <p className=' font-semibold'>Company Name:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.companyName}
         </p> 
        </> 
        }
         <p className=' font-semibold mt-2'>Service:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
          {data.service}
         </p> 
        </div>
        <div className='w-2/6 p-1'>
         <p className=' font-semibold'>UID:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.userId}
         </p> 

         <p className=' font-semibold'>Status:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.status}
         </p> 
        </div>
        <div className='w-1/6 flex'>
         <div className='w-2/4 items-center p-5'>
          {data.status === "pending"?
           <CheckIcon onClick={approveUser(data.userId)} className='h-5 w-5 mx-auto my-auto cursor-pointer' />
           :
           <PauseIcon onClick={rejectUser(data.userId)} className='h-5 w-5 mx-auto my-auto cursor-pointer' />
          }  
         </div>
         <div className='w-2/4 items-center p-5'>
          <TrashIcon onClick={() => {deleteDoc(doc(db, `users`, data.userId))}} 
           className='h-5 w-5 mx-auto cursor-pointer' 
          />
         </div>
        </div>
      </div>
    )
  };

  

  const filteredItems = users.filter(
		item => item.item && item.item.toLowerCase().includes(filterText.toLowerCase())
    ||
    item.category && item.category.toLowerCase().includes(filterText.toLowerCase()),
	);


  useEffect(() => {
    const getUsers = async () => {
      const ref = collection(db, "users")
      const q = query(ref, where(("account", "==", `customer` || ("account", "==", `merchant`))))
      onSnapshot(q, (snapshot) => {
       setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return getUsers()
  },[])

  
  
  return (
    <>
      {user?.account === "admin"?
      <>
       <div hidden={hideLoading} className="w-screen h-screen z-50 md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden">
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
       
        <div className='w-full h-screen bg-white overflow-hidden'>
        
        <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
         <header className='w-full h-16 bg-white'>
          
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
            <div className='w-full h-10 flex mt-2 animate-pulse'>
              <div className='w-9/12 px-1 py-1'>
                <input
                 placeholder='Search'
                 className='w-11/12 ml-1 h-full bg-gray-200 rounded-md md:w-2/4 lg:w-6/12 px-2 border-0'
                 value={filterText}
                 onChange={e => setFilterText(e.target.value)}
                />
              </div> 
              {/*
               <div className='w-3/12 p-2'>
                <FolderAddIcon onClick={openModal} className='w-8 h-8 cursor-pointer mx-auto' />
               </div> 
              */}
            </div> 
            </div>  
            
         </header>

        <div className='w-full h-full mt-2 px-1 pb-2'>
          <DataTable 
            columns={columns} 
            data={filterText? filteredItems: listings} 
            expandableRows 
            pagination
            expandableRowsComponent={ExpandedComponent}
           />
        </div> 

        </main>
      </div>
      </>
      :
      <div>There are no users.</div>
      } 
    </>
  )
}

export default Users