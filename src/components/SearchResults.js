import React from 'react'
import SearchProduct from './SearchProduct';

function SearchResults({ products, searchTerm }) {
  return (
    <div className='w-full relative grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mx-auto py-6'>

       {/*products.products.map(({id, title, price, description, category, thumbnail}) => (
        <Product
            key={id} 
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={thumbnail}
       />
       ))*/}

     {products.slice(0, 4)
      .filter((val) => {
        if(searchTerm == ""){
          return val;
        }else if(

          val?.item?.includes(searchTerm)
          || 
          val?.category?.includes(searchTerm) 
          ||
          val?.description?.includes(searchTerm) 
          ||
          val?.brandName?.includes(searchTerm) 
          ||   
          val?.item?.includes(searchTerm.toLowerCase())
          || 
          val?.category?.includes(searchTerm.toLowerCase()) 
          ||
          val?.description?.includes(searchTerm.toLowerCase()) 
          ||
          val?.brandName?.includes(searchTerm.toLowerCase())
        
        ){
          return val;
        }
      })
      .map(({productId, item, price, description, category, photoURL, brandName, userId, store}) => (
       <SearchProduct
        //key={id} 
        id={productId}
        title={item}
        price={price}
        description={description}
        category={category}
        image={photoURL}
        productId={productId}
        brandName={brandName}
        userId={userId}
        store={store}
       />
      ))}

     {/*<img className='w-full col-span-full' src="https://links.papareact.com/dyz" alt="" />*/}   

     {products.slice(4, 5)
      .filter((val) => {
        if(searchTerm == ""){
          return val;
        }else if(

         val?.item?.includes(searchTerm)
         || 
         val?.category?.includes(searchTerm) 
         ||
         val?.description?.includes(searchTerm) 
         ||
         val?.brandName?.includes(searchTerm) 
         ||   
         val?.item?.includes(searchTerm.toLowerCase())
         || 
         val?.category?.includes(searchTerm.toLowerCase()) 
         ||
         val?.description?.includes(searchTerm.toLowerCase()) 
         ||
         val?.brandName?.includes(searchTerm.toLowerCase())
        
        ){
          return val;
        }
      }) 
      .map(({productId, item, price, description, category, photoURL, brandName, userId, store}) => (
       <SearchProduct
        //key={id} 
        id={productId}
        title={item}
        price={price}
        description={description}
        category={category}
        image={photoURL}
        productId={productId}
        brandName={brandName}
        userId={userId}
        store={store}
        />
      ))}

     {products.slice(5, products.length)
      .filter((val) => {
        if(searchTerm == ""){
          return val;
        }else if(

          val?.item?.includes(searchTerm)
          || 
          val?.category?.includes(searchTerm) 
          ||
          val?.description?.includes(searchTerm) 
          ||
          val?.brandName?.includes(searchTerm) 
          ||   
          val?.item?.includes(searchTerm.toLowerCase())
          || 
          val?.category?.includes(searchTerm.toLowerCase()) 
          ||
          val?.description?.includes(searchTerm.toLowerCase()) 
          ||
          val?.brandName?.includes(searchTerm.toLowerCase())
        
        ){
          return val;
        }
      })
      .map(({productId, item, price, description, category, photoURL, brandName, userId, store}) => (
       <SearchProduct
        //key={id} 
        id={productId}
        title={item}
        price={price}
        description={description}
        category={category}
        image={photoURL}
        productId={productId}
        brandName={brandName}
        userId={userId}
        store={store}
        />
      ))}

    </div>
  )
}

export default SearchResults
