import React from 'react'
import WishlistProduct from './WishlistProduct'

function ProductFeed({ products }) {

    
  return (
    <div className='w-full relative grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mx-auto'>

     {products.map(({productId, item, price, description, category, photoURL}) => (
        <WishlistProduct
        //key={id} 
        id={productId}
        title={item}
        price={price}
        description={description}
        category={category}
        image={photoURL}
        productId={productId}
       />
     ))}

    </div>
  )
}

export default ProductFeed
