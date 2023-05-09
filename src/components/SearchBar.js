import { Fragment, useContext, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";


const SearchBar = ({search, setSearch}) => {
    return (
      <div className='w-full items-center rounded-md flex flex-grow cursor-pointer bg-purple-900 hover:bg-purple-500'>
       <input 
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text"
        value={search}
        onChange={setSearch}
       />
       <SearchIcon className='h-12 p-4 text-gray-50' />  
      </div>
    )
}

export default SearchBar