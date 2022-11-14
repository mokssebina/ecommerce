import React from 'react'
import Product from './Product'

function FilterFeed({ products, section }) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>

     {products.filter(product => product.category === `${section}`).map((item) => (
        <Product
            key={item.id} 
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            category={item.category}
            image={item.image}
       />
       ))}

    </div>
  )
}

export default FilterFeed
