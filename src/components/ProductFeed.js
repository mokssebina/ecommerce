import React from 'react'
import Product from './Product'

function ProductFeed({ products }) {
  return (
    <div className='w-full relative grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 mx-auto'>

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

     {products.slice(0, 4).map(({id, title, price, description, category, image}) => (
        <Product
            key={id} 
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
       />
       ))}

     {/*<img className='w-full col-span-full' src="https://links.papareact.com/dyz" alt="" />*/}   

     {products.slice(4, 5).map(({id, title, price, description, category, image}) => (
        <Product
            key={id} 
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
       />
     ))}

     {products.slice(5, products.length).map(({id, title, price, description, category, image}) => (
        <Product
            key={id} 
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
       />
        ))}

    </div>
  )
}

export default ProductFeed
