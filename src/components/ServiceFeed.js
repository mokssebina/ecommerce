import React from 'react'
import SearchProduct from './SearchProduct';
import ServiceItem from './ServiceItem';


function ServiceFeed({ services }) {
    
  return (
    <div className='w-full relative grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mx-auto'>

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

     {services.map(({companyName, account, bio, displayPicture, email, service, userId}) => (
       <ServiceItem
        key={userId} 
        companyName={companyName}
        account={account}
        bio={bio}
        email={email}
        displayPicture={displayPicture}
        service={service}
        id={userId}
       />
      ))}

    </div>
  )
}

export default ServiceFeed