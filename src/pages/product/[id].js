import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { ShoppingCartIcon, PlusIcon, HeartIcon } from "@heroicons/react/outline";
import Image from 'next/image';
import StarIcon from '@heroicons/react/solid/StarIcon'
import Currency from 'react-currency-formatter';
import { addToBasket } from '../../slices/basketSlice';
import { useDispatch } from 'react-redux';


const ProductDetails = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { myData } = router.query;
    const [data, setData] = useState({})

    const MAX_RATING = 5;
    const MIN_RATING = 1;

    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING)

    const [hasPrime] = useState(Math.random() < 0.5)

    useEffect(() => {
        if (myData) setData(JSON.parse(myData));
    }, [router.query]);

    const addItemToBasket = () => {
      const product = {
        id: data.id, 
        title: data.title, 
        price: data.price, 
        description: data.description, 
        category: data.category, 
        image: data.image
    }
      
      //Send the product as an action to the REDUX store
      dispatch(addToBasket(product))
    }

  return (
    <div className="h-screen w-screen bg-gray-200">
     <main className="relative w-full lg:flex lg:w-11/12 xl:w-9/12 max-w-screen-2xl mx-auto pt-5 mb-5">
      <div className='relative w-full md:full lg:w-3/4 pt-1 px-3'>

       <div className='w-full h-full bg-white sm:flex md:flex lg:flex animate-pulse shadow-md p-4'>

        <div className='relative w-full md:w-2/4 lg:w-2/4'>
          <div className='w-9/12 mx-auto aspect-square border-gray-400 md:space-x-2 border-2'>
            {data.image &&
              <Image className='w-64 h-64 mx-auto my-auto' src={data.image} height={250} width={250} objectFit='contain' />
            }
          </div>
        </div>
        <div className='relative w-full md:w-2/4 lg:w-2/4 p-3'>

          <p className='text-gray-800 text-2xl md:text-3xl lg:text-4xl mb-2'>{data.title}</p>

          <p className='mt-2 text-base md:text-lg text-purple-900'>Merchant</p>

          <p className='mt-2 text-sm md:text-base text-gray-700'>{data.category}</p>

          <p className='mt-2 text-xs md:text-sm line-clamp-1 md:line-clamp-2'>You can also animate the skeleton component.</p>

          <div className='flex mt-2'>

            {Array(rating)
            .fill()
            .map((_,i) => (
                <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}

          </div>

          <div className='w-full h-11 border-gray-400 border-t-2 border-b-2 p-1 mt-2'>
          <p className='font-semibold text-base md:text-lg'>In Stock</p> 
          </div>

          <div className='w-full lg:hidden p-2'>

            <div className='relative w-full my-5 flex flex-col p-3'>
              <h3 className='font-bold text-2xl md:text-3xl lg:text-5xl'>{`P${data.price}`}</h3> 
            </div> 
            <button onClick={addItemToBasket} className='w-full h-9 flex md:h-11 text-white lg:h-12 bg-purple-900 mt-4 hover:bg-purple-700'>
            <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
              <PlusIcon className="h-4 w-4" /> 
              <ShoppingCartIcon className="h-4 w-4" />
              <p>Add to Cart</p> 
            </div>
            </button>
            <button className='w-full h-9 flex md:h-11 text-gray-500 lg:h-12 bg-gray-200 mt-4 mb-4 hover:bg-gray-400'>
            <div className='flex h-6 mx-auto my-auto py-1 space-x-1'>
              <HeartIcon className="h-4 w-4" />
              <p>Add to Favourites</p> 
            </div>
            </button>

          </div>
        </div>
       </div>

      </div>

      <div className='hidden relative w-full lg:flex flex-col lg:w-1/4 pt-1 px-3'>
       <div className='w-full bg-white animate-pulse shadow-md p-2'>

        <div className='relative w-full my-5 flex flex-col p-3 bg-slate-500'>
          <h3 className='font-semibold text-2xl md:text-3xl lg:text-3xl'>{`P${data.price}`}</h3> 
        </div> 
        <button onClick={addItemToBasket} className='w-full h-9 flex md:h-11 text-white lg:h-12 bg-purple-900 mt-4 hover:bg-purple-700'>
         <div className='flex h-6 mx-auto my-auto space-x-1'>
          <PlusIcon className="h-4 w-4" /> 
          <ShoppingCartIcon className="h-4 w-4" />
          <p>Add to Cart</p> 
         </div>
        </button>
        <button className='w-full h-9 flex md:h-11 text-gray-500 lg:h-12 bg-gray-200 mt-4 mb-4 hover:bg-gray-400'>
         <div className='flex h-5 mx-auto my-auto space-x-1'>
          <HeartIcon className="h-5 w-5" />
          <p>Add to Favourites</p> 
         </div>
        </button>

       </div>
      </div>

     </main>   
     <main className="relative w-full lg:w-11/12 xl:w-9/12 max-w-screen-2xl mx-auto p-4">
     {data.description && 
      <div className='w-full sm:w-full md:w-full lg:w-full animate-pulse py-1 bg-white shadow-md'>
       <div className='w-full h-12 md:h-10 p-2 mb-4 border-gray-400 border-b'>
        <p className='font-semibold text-lg text-gray-800'>Description</p> 
       </div>
       <div className='w-full p-2 mb-4'>
        <p className='text-sm sm:text-base md:text-base lg:text-base text-gray-700'>{data.description}</p>
       </div> 
      </div>
     }
     </main>
    </div>
  )
}

export default ProductDetails 
/*
export async function getServerSideProps() {
    const data = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
    .then((res) => res.json())
    //.then((json) => console.log(json));
  
    console.log("products: ",data)
    //console.log("products: ",products)
  
    //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale`)
  
    //console.log("properties: ",propertyForSale)
  
    return { props: {
      products: data
      //propertiesForSale: propertyForSale?.hits,
    },
   }
  }
  */