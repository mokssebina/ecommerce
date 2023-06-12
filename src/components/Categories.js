import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import categories from '../data/categories'

const Categories = () => {

  const router = useRouter();
  const [searchField, setSearchField] = useState("");


  const goToSearch = () => {
    router.push({
      pathname: `/search_results/${searchField}`,
      query: {
        myData: searchField
    }})
  }


  useEffect(() => {
    
    if(searchField){
      try {
        goToSearch()
        setSearchField("")
      } catch (error) {
        setSearchField("")
      }
    }
    
  },[searchField])


  return (
    <div className='hidden lg:flex flex-col w-10/12 xl:w-9/12 max-h-full mb-5 mx-auto border border-gray-700'>
     <div className='w-full h-9 bg-amazon_blue text-gray-50 text-sm p-2 mb-1'>
      <p>Categories</p>
     </div>  

     {categories.map(data => (
      <div key={data.index} 
       className='w-full h-8 text-xs text-gray-900 cursor-pointer hover:bg-amazon_blue hover:text-gray-50 px-2 py-2'
       onClick={() => setSearchField(data.item)}
      >
        <p>{data.item}</p>
      </div>
     ))}
        
    </div>
  )
}

export default Categories