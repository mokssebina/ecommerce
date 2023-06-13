import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import categories from '../data/categories'

const CategoriesDropdown = () => {

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
        console.log("selected category: ",searchField)
        goToSearch()
        setSearchField("")
      } catch (error) {
        setSearchField("")
      }
    }
    
  },[searchField])


  return (
    <div className='w-full h-full md:w-96 rounded-md mb-5 mx-auto border border-gray-700'>
     <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className='w-full h-9 text-gray-900 text-sm p-2 mb-1'>
      
     <option className='w-full h-8 text-xs cursor-pointer px-2 py-2'>
       <p>Select Category</p> 
     </option>

     {categories.map(data => (
      <option value={data.item} key={data.index} 
       className='w-full h-8 text-xs cursor-pointer px-2 py-2'
      >
        <p>{data.item}</p>
      </option>
     ))}

    </select>  
        
    </div>
  )
}

export default CategoriesDropdown