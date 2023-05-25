import React, { useState, useEffect, Fragment, useContext } from "react";
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { AuthContext } from "../context/AuthContext";
import { withProtected } from "../components/protected-route";
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
import { uploadPicture } from '../../services/firebase';
import { ThreeCircles } from  'react-loader-spinner'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';


const columns = [
  {
    name: "Item",
    selector: row => row.item,
  },
  {
    name: "Quantity",
    selector: row => row.units
  },
  {
    name: "Order No",
    selector: row => row.orderId
  },
  {
      name: 'Price',
      selector: row => row.price,
  },
]



function Profile({ children }) {
  
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState('');
  const [pic, setPic] = useState('');
  const [orders, setOrders] = useState([])
  const [hideLoading, setHideLoading] = useState(true);
  const [filterText, setFilterText] = useState('');


  const { user } = useContext(AuthContext)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setPic("")
    setIsOpen(false)
  }

  const clearPayload = () => {
    setImage("");
    setPic("")
  }

  const pickImage = (e) => {
    setPic(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  const createPicUpload = () => {
    uploadPicture(user,image)
  }

  
  function uploadPicture(user, image) {

    setIsOpen(false)

    setHideLoading(false)

    const docRef = doc(db, "users", `${user?.uid}`)

    try {

      const storageRef = ref(storage, `${user?.uid}/display_picture/${image.name}`); 

      const uploadTask = uploadBytesResumable(
        storageRef,
        image
      );
      uploadTask.on(
        "state_changed",
        (snap) => {
          console.log(snap);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => { 
              console.log("File available at", downloadURL);

              const payload = {
                displayPicture: downloadURL,
              }

              await updateDoc(docRef, payload);
            },
            clearPayload,
            setHideLoading(true)
          );
        },

      );

    } catch (error) {
      console.log(error);
      clearPayload
      setHideLoading(true)
      return error;
    }

  }


  return (
        
      <main className='w-full h-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

        <div className="w-full h-full lg:flex items-center justify-center p-4 text-center">
              
                <div className="w-full h-full lg:w-2/5 transform overflow-hidden pt-16 px-2 text-left align-middle">
                  <div className='w-full h-6 flex px-2'>
                    
                   <div className='w-10/12'>
                    <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Profile Update
                    </h3>
                   </div>
                   
                  </div>  
                  <div className="w-full h-64 mt-2 p-1">

                    <input type="file" accept=".image/png, image/jpeg, image/jpg" className='h-10 p-1' image={image} onChange={pickImage} />

                    <div className='relative w-24 h-24 rounded-full mx-auto mt-2 bg-black'>
                     {user?.displayPicture ?
                      <Image src={`${user?.displayPicture}`} className="rounded-full" width={96} height={96} objectFit='contain' />
                      :
                      null
                    }
                    </div>

                    <div className='w-7/12 mt-4 items-center text-gray-800'>
                     <p className='font-semibold text-lg'>{user?.displayName}</p>
                     <p className='text-xs'>{user?.email}</p>
                    </div>

                  </div>

                  <div className='w-full h-14 p-2'>
                   <button onClick={createPicUpload} className='w-full h-full mt-2 rounded-md text-xs text-gray-50 bg-amazon_blue'>Upload Picture</button>
                  </div>
                  
                </div>

                <div className="w-full h-96 lg:w-3/5 transform overflow-hidden bg-black pt-6 px-2 text-left"></div>

            </div>

      </main>

  );
}

export default withProtected(Profile)
