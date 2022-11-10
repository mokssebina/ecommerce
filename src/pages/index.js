import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Footer from "../components/Footer";


export default function Home({ products }) {

  const goToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }

  return (
    <div className="h-full w-full bg-backdrop-image">
      <Head>
        <title>Jobber</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto" style={{backgroundColor: "rgba(209, 194, 184, 0.4)"}}>
      {/*Banner*/}  
      <Banner />

      {/*Product Feed*/}  
      <ProductFeed products={products} />

      </main>

      <Footer goToTop={goToTop} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://raw.githubusercontent.com/mokssebina/MMNT/master/project.json')
  .then((res) => res.json())
  //.then((json) => console.log(json));

  //console.log("products",products)

  return { props: {
    products,
  },
 }
}

//https://fakestoreapi.com/products
//https://raw.githubusercontent.com/mokssebina/MMNT/master/products

//https://dummyjson.com/products/category/automotive
