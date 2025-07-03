import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  fetchProductsByFilter, setFilters } from '../../../redux/slices/productsSlice';

const Searchbar = () => {
    const [searchTerm,setSearchTerm]=useState("");
    const dispatch=useDispatch()
    const navigate=useNavigate()
   

    const handleSearch=(e)=>{
        e.preventDefault();
        dispatch(setFilters({search:searchTerm}))
        dispatch(fetchProductsByFilter({search:searchTerm}))
        navigate(`/collections/all?search=${searchTerm}`)
    }
  return (
     <div className='w-[400px] h-[40px]  md:flex hidden'>
                <form className='flex w-full' onSubmit={handleSearch}>
              <input type="text" placeholder='Search items' value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} className='w-full  focus:border-black h-full rounded-l-[10px] px-2 bg-white outline-none border border-gray-400'></input>
               <button type="submit"><IoIosSearch className='h-full text-2xl w-[40px] border-gray-400 border rounded-r-[10px] bg-yellow-400'/></button>
            </form>
            </div>
  )
}

export default Searchbar
