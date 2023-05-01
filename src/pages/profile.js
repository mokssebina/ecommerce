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

  const ExpandedComponent = ({ data }) => {
    return (
      <div className='w-full px-1 pt-4 pb-2 text-xs text-gray-500 flex'>
        <div className='w-1/5 p-1'>
         <img className='w-3/5 h-auto mx-auto' src={data.photoURL} />
        </div>
        <div className='w-2/5 p-1'>
         <p className=' font-semibold'>Description:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.description}
         </p> 
        </div>
        <div className='w-1/5 p-1'>
         <p className=' font-semibold'>Category:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
          {data.category}
         </p> 
        </div>
        <div className='w-1/5 flex'>
         <div className='w-2/4 items-center p-5'>
         {/*<PencilIcon className='h-5 w-5 mx-auto my-auto cursor-pointer' />*/}
         </div>
         <div className='w-2/4 items-center p-5'>
          <TrashIcon onClick={() => {
              deleteDoc(doc(db, `listings`, data.orderId))
            }} 
           className='h-5 w-5 mx-auto cursor-pointer' />
         </div>
        </div>
      </div>
    )
};

  const filteredItems = orders.filter(
		item => item.item && item.item.toLowerCase().includes(filterText.toLowerCase())
    ||
    item.category && item.category.toLowerCase().includes(filterText.toLowerCase()),
	);



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
        
        <header className='fixed w-full bg-white'>
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
          <div className='w-full h-10 flex mt-2'>
            <div className='w-9/12 px-2 py-2'>
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
        
        <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

        <div className='w-full h-full mt-32 px-1 pb-2'>
          
         <DataTable 
           columns={columns} 
           data={filterText === ""? orders: filteredItems} 
           expandableRows 
           pagination
           fixedHeader
           responsive
           expandableRowsComponent={ExpandedComponent}
          />        

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
