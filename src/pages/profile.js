import React, { useState, useEffect, Fragment, useContext } from "react";
import { UserIcon, FolderAddIcon } from '@heroicons/react/outline'
import OrderItem from "../components/OrderItem";
import AccountUpdate from "../components/AccountUpdate";
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



function Profile({ children }) {
  
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState('');
  const [hideLoading, setHideLoading] = useState(true);


  const { user } = useContext(AuthContext)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const pickImage = (e) => {
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
            setHideLoading(true)
          );
        },

      );

    } catch (error) {
      console.log(error);
      setHideLoading(true)
      return error;
    }

  }



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
     <AccountUpdate isOpen={isOpen} Fragment={Fragment} image={image} pickImage={pickImage} createPicUpload={createPicUpload} closeModal={closeModal} />
      <div className='w-full h-screen bg-white overflow-hidden'>
        
        <header className='fixed w-full shadow-md z-20 bg-white'>
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
          <div className='w-full h-10 flex mt-2'>
            <div className='w-9/12 px-1 py-1'>
            <input placeholder='Search' className='w-11/12 ml-1 h-full bg-gray-200 rounded-md md:w-2/4 lg:w-6/12 px-1 border-0' />
            </div> 
            <div className='w-3/12 p-2'>
             
            </div> 
          </div> 
          </div>  
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto h-14 bg-white relative z-10 mb-2'>
          <div className='w-9/12 h-full flex justify-between items-center text-sm font-semibold text-gray-800'>
            
            <div className='items-center ml-2'>
              <span>ID</span>
            </div>
            <div className='items-center ml-16'>
              <span>Date</span>
            </div>
            <div className='items-center'>
              <span>Total(BWP)</span>
            </div>

          </div>

          </div>
        </header>
        
        <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

        <div className='w-full h-full mt-32 px-1 pb-2'>
          
          <OrderItem />    
          <OrderItem />       
          <OrderItem />       

        </div> 

        </main>
      </div>

     <div onClick={() => setIsOpen(true)} className="fixed w-11 h-11 rounded-full left-3 bottom-3 bg-gray-300 cursor-pointer hover:bg-gray-400 shadow-md">
      <UserIcon className="w-5 h-5 mx-auto mt-3" />
     </div>
    </> 
  );
}

export default withProtected(Profile)
