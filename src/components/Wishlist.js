import React from 'react'
import WishlistProduct from './WishlistProduct'

function WishListFeed({ products }) {

    
  return (
    <div className='w-full relative grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mx-auto'>

     {products.map(({productId, item, price, description, category, photoURL, brandName, userId, store}) => (
        <WishlistProduct
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

export default WishListFeed
