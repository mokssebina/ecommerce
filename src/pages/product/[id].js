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
    <div className="h-full w-full">
     <main className='relative w-full h-full bg-gray-400 sm:flex lg:w-9/12 max-w-screen-2xl mx-auto bg-white'>
      <div className='relative w-full sm:w-2/4 my-5 flex flex-col bg-white p-5'>

        <h4 className='visible sm:invisible my-3'>{data.title}</h4>

        {data.image &&
          <Image src={data.image} height={250} width={250} objectFit='contain' />
        }
      </div>  
      <div className='relative w-full sm:w-2/4 my-5 flex flex-col bg-white p-5'>
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{data.category}</p>

        <h4 className='invisible sm:visible my-3'>{data.title}</h4>

        <div className='flex'>

        {Array(rating)
        .fill()
        .map((_,i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
        ))}

        </div>

        <p className='text-xs my-2 line-clamp-2'>{data.description}</p> 

        <div className='mb-5'>

        <Currency quantity={data.price} currency="BWP" />  

        </div>

        {hasPrime && (
            <div className='flex items-center space-x-2 -mt-5'>
            <img className='w-12' src="https://links.papareact.com/fdw" alt="" />  
            <p className='text-xs text-gray-500'>Free delivery within Gaborone</p>
            </div>
        )}

        <button onClick={addItemToBasket} className='mt-auto button bg-yellow-700 text-white'>Add to Basket</button>

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