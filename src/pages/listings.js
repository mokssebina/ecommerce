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
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';


const columns = [
  {
    name: "Brand",
    selector: row => row.brandName,
  },
  {
    name: "Item",
    selector: row => row.item,
  },
  {
    name: "Units",
    selector: row => row.units
  },
  {
      name: 'Price',
      selector: row => row.price,
  },
]


function Listings() {
  
  const [listings, setListings] = useState([{}]);
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState("");
  const [units, setUnits] = useState(0);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [hideLoading, setHideLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [brand, setBrand] = useState("")


  const { user } = useContext(AuthContext)

  function clearPayload() {
    setImage("");
    setUnits(0);
    setItem("");
    setPrice(0);
    setCategory("");
    setDescription("");
    setBrand("")
  }
  
  function closeModal() {
    setIsOpen(false);
    setImage("");
    setUnits(0);
    setItem("");
    setPrice(0);
    setCategory("");
    setDescription("");
    setBrand("")
  }

  function openModal() {
    setIsOpen(true)
  }

  function createListing() {

    try {
      setIsOpen(false)
      setHideLoading(false)

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

              const dbRef = collection(db, "listings")
              
              await addDoc(dbRef, {
                photoURL: downloadURL,
                units: units,
                item: item,
                price: price,
                summary: summary,
                category: category,
                description: description,
                userId: user?.uid,
                store: user?.displayName,
                inStock: "yes",
                brandName: brand
              })
              .then(async (docRef) => {
                console.log("product ID: ",docRef.id)
                const listingRef =  doc(db, "listings", `${docRef.id}`)

                await updateDoc(listingRef, {
                  productId: docRef.id
                });
              });
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

  const ExpandedComponent = ({ data }) => {
    return (
      <div className='w-full px-1 pt-4 pb-2 text-xs text-gray-500 flex'>
        <div className='w-1/6 p-1'>
         <img className='w-3/5 h-auto mx-auto' src={data.photoURL} />
        </div>
        <div className='w-2/6 p-1'>
         <p className=' font-semibold'>Summary:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
         {data.summary}
         </p> 
        </div>
        <div className='w-2/6 p-1'>
         <p className=' font-semibold'>Description:</p> 
         <p className='mt-1 mb-2 line-clamp-2'>
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
          <TrashIcon onClick={() => {
              deleteDoc(doc(db, `listings`, data.productId))
            }} 
           className='h-5 w-5 mx-auto cursor-pointer' />
         </div>
        </div>
      </div>
    )
  };

  

  const filteredItems = listings.filter(
		item => item.item && item.item.toLowerCase().includes(filterText.toLowerCase())
    ||
    item.category && item.category.toLowerCase().includes(filterText.toLowerCase()),
	);


  useEffect(() => {
    const getListings = async () => {
      const ref = collection(db, "listings")
      const q = query(ref, where("inStock", "==", "yes"))
      onSnapshot(q, (snapshot) => {
       setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return getListings()
  },[])

  const tableData = {
    columns,
    listings
  };
  
  return (
    <>
      {user?.account === "service-provider"?
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
       <ListingsUpload isOpen={isOpen}
        image={image}
        setImage={(e) => setImage(e.target.files[0])}
        item={item}
        setItem={(e) => setItem(e.target.value)}  
        brand={brand}
        setBrand={(e) => setBrand(e.target.value)}   
        units={units}
        setUnits={(e) => setUnits(e.target.value)}
        price={price}
        setPrice={(e) => setPrice(e.target.value)}
        summary={summary}
        setSummary={(e) => setSummary(e.target.value)}
        category={category}
        setCategory={(e) => setCategory(e.target.value)}
        description={description}
        setDescription={(e) => setDescription(e.target.value)}
        Fragment={Fragment} 
        createListing={createListing} 
        closeModal={closeModal} />

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
              <div className='w-3/12 p-2'>
                <FolderAddIcon onClick={openModal} className='w-8 h-8 cursor-pointer mx-auto' />
              </div> 
            </div> 
            </div>  
            
         </header>

        <div className='w-full h-full mt-2 px-1 pb-2'>

          {/*listings.length > 0 ?
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
            */}  
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
      <div>You do not have a merchant account, please apply to be a merchant to access this page.</div>
      } 
    </>
  )
}

export default Listings