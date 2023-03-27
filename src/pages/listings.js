import React, { useState, useEffect, Fragment, useContext } from 'react'
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


function Listings() {
  
  const [listings, setListings] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState("");
  const [units, setUnits] = useState(0);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(AuthContext)

  
  function closeModal() {
    setIsOpen(false);
    setImage("");
    setUnits(0);
    setItem("");
    setPrice(0);
    setCategory("");
    setDescription("");
  }

  function openModal() {
    setIsOpen(true)
  }

  function createListing() {

    try {

      const storageRef = ref(storage, `${user?.uid}/listings/${image.name}`); 

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
              
              await addDoc(collection(db, "listings"), {
                photoURL: downloadURL,
                units: units,
                item: item,
                price: price,
                category: category,
                description: description,
                userId: user?.uid,
                store: user?.displayName
              });
            }
          );
        },
        closeModal()
      );

    } catch (error) {
      console.log(error);
      //closeModal()

      return error;
    }

  }


  useEffect(() => {
    const getListings = async () => {
      const ref = collection(db, "listings")
      const q = query(ref, where("userId", "==", `${user?.uid}`))
      onSnapshot(q, (snapshot) => {
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return getListings()
  },[])

  return (
    <>
      {user?.account === "merchant"?
      <>
       <ListingsUpload isOpen={isOpen}
        image={image}
        setImage={(e) => setImage(e.target.files[0])}
        item={item}
        setItem={(e) => setItem(e.target.value)}       
        units={units}
        setUnits={(e) => setUnits(e.target.value)}
        price={price}
        setPrice={(e) => setPrice(e.target.value)}
        category={category}
        setCategory={(e) => setCategory(e.target.value)}
        description={description}
        setDescription={(e) => setDescription(e.target.value)}
        Fragment={Fragment} 
        createListing={createListing} 
        closeModal={closeModal} />

        <div className='w-full h-screen bg-white overflow-hidden'>
        
        <header className='fixed w-full shadow-md z-20 bg-white'>
          <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
            <div className='w-full h-10 flex mt-2'>
              <div className='w-9/12 px-1 py-1'>
                <input placeholder='Search' className='w-11/12 ml-1 h-full bg-gray-200 rounded-md md:w-2/4 lg:w-6/12 px-1 border-0' />
              </div> 
              <div className='w-3/12 p-2'>
                <FolderAddIcon onClick={openModal} className='w-8 h-8 cursor-pointer mx-auto' />
              </div> 
            </div> 
            </div>  
            <div className='w-full lg:w-9/12 max-w-screen-2xl mx-auto h-14 bg-white relative z-10 mb-2'>
            
            <div className='w-9/12 h-full flex justify-between items-center text-sm font-semibold text-gray-800'>
              
              <div className='items-center ml-2'>
                <span>Item</span>
              </div>
              <div className='items-center ml-16'>
                <span>Unit</span>
              </div>
              <div className='items-center'>
                <span>Price(BWP)</span>
              </div>

            </div>

          </div>
        </header>
        
        <main className='w-full lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>

        <div className='w-full h-full mt-32 px-1 pb-2'>

          {listings.length > 0 ?
           listings.map((listing) => 
            <Listing 
             deleteListing={() => {
              deleteDoc(doc(db, `listings`, listing.id))
             }}
             thumbnail={listing.photoURL} 
             item={listing.item} 
             units={listing.units} 
             price={listing.price} 
             category={listing.category} 
             description={listing.description} />
          )
           :
           <div className='relative w-full h-48 items-center my-auto'>
            <p className='text-base mt-2 mb-2 text-center'>Create listings and start selling</p>
           </div>
          }  

        </div> 

        </main>
      </div>
      </>
      :
      <div>You do not have a merchant account, please apply to be a merchant to access this page.</div>
      } 
    </>
  )
}

export default Listings