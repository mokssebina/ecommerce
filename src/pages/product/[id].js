import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
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
    <div className="h-full w-full bg-gray-200">
     <main className='relative w-full h-full md:w-10/12 lg:w-9/12 md:space-x-2 flex flex-grow max-w-screen-2xl mx-auto'>

      <div className='relative w-full md:w-3/4 my-5 flex shadow-md bg-white p-3'>

       <div className='w-full md:w-2/4 aspect-square border-gray-400 md:space-x-2 border-2'>
        {data.image &&
          <Image src={data.image} height={250} width={250} objectFit='contain' />
        }
       </div>

       <div className='w-full px-3 md:w-2/4 md ml-4'>
        <h2 className='font-bold text-sm md:text-lg my-3'>{data.title}</h2>

        <p className='mt-4 text-xs md:text-sm text-blue-800'>Merchant</p>

        <p className='mt-4 text-xs md:text-sm'>You can also animate the skeleton component.</p>

        <div className='flex'>

          {Array(rating)
          .fill()
          .map((_,i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}

        </div>

        <div className='w-full h-11 border-gray-400 border-t-2 border-b-2'>
         <p className='font-bold text-base md:text-lg'>In Stock</p> 
        </div>

       </div>
        
      </div>  

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