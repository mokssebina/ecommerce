import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import categories from '../data/categories'

const CategoriesDropdown = ({searchField, setSearchField}) => {

  const router = useRouter();
  //const [searchField, setSearchField] = useState("");


  const goToSearch = () => {
    router.push({
      pathname: `/search_results/${searchField}`,
      query: {
        myData: searchField
      }
    })
  }

/*
  useEffect(() => {

    if (searchField) {
      try {
        console.log("selected category: ", searchField)
        goToSearch()
        setSearchField("")
      } catch (error) {
        setSearchField("")
      }
    }

  }, [searchField])
*/

  return (
    <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className='w-full sm:w-2/4 lg:w-3/4 h-10 rounded-md text-gray-800 border cursor-pointer border-gray-800 text-sm p-2 mt-4'>

      <option className='w-full h-10 text-xs cursor-pointer px-2 py-2'>
        <p>Select Category</p>
      </option>

      {categories.map(data => (
        <option value={data.item} key={data.index}
          className='w-full h-10 text-xs cursor-pointer px-2 py-2'
        >
          {data.item}
        </option>
      ))}

    </select>
  )
}

export default CategoriesDropdown