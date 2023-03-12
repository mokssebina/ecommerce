import React, {useState} from 'react';
import Head from "next/head";
import Header from "../components/AppLayout";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Footer from "../components/Footer";
import FilterFeed from '../components/FilterFeed';
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { useSession } from 'next-auth/client';



export default function Home({ products }) {
  /*
  const [session] = useSession();

  if(!session) {
    console.log("There is no ongoing session")
  }
  else {
    console.log("There is a session")
  }
  */

  const goToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }

  const [category, setCategory] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setMenu] = useState(true)


  const goHome = () => {
    setFiltered(false)
    setMenu(true)
  }
  
  const pickTools = () => {
    setCategory('Tools')
    setFiltered(true)
    setMenu(true)
  }

  const pickFoundation = () => {
    setCategory('Foundation')
    setFiltered(true)
    setMenu(true)
  }

  const pickAdhesive = () => {
    setCategory('Adhesive')
    setFiltered(true)
    setMenu(true)
  }

  const pickFencing = () => {
    setCategory('Fencing')
    setFiltered(true)
    setMenu(true)
  }

  const pickGeyser = () => {
    setCategory('Geyser')
    setFiltered(true)
    setMenu(true)
  }

  const pickPaint = () => {
    setCategory('Paint')
    setFiltered(true)
    setMenu(true)
  }



  return (
    <div className="h-full w-full overflow-y-hidden md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden">
      <Head>
        <title>Jobber</title>
      </Head>

      {/* Header 
      <Header 
       goHome={goHome}
       menu={menu}
       openMenu={() => setMenu(false)}
       closeNav={() => setMenu(true)}
       pickTools={pickTools} 
       pickFoundation={pickFoundation}
       pickAdhesive={pickAdhesive}
       pickFencing={pickFencing}
       pickGeyser={pickGeyser}
       pickPaint={pickPaint} />*/}

      <main className="relative w-full max-w-screen-2xl mx-auto" style={{backgroundColor: "rgba(209, 194, 184, 0.4)"}}>
        
      {/*Banner*/}  
      <Banner />

      {filtered ?  
      <FilterFeed products={products} section={category} />
      :
      <ProductFeed products={products} />
      }

      </main>

      {/*<Footer goToTop={goToTop} />*/}
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
  .then((res) => res.json())
  //.then((json) => console.log(json));

  //console.log("products: ",products)

  //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale`)

  //console.log("properties: ",propertyForSale)

  return { props: {
    products
    //propertiesForSale: propertyForSale?.hits,
  },
 }
}

//https://fakestoreapi.com/products
//https://raw.githubusercontent.com/mokssebina/MMNT/master/products

//https://dummyjson.com/products/category/automotive
