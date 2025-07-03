import React, { useEffect,useState } from 'react'
import ProductsGrid from '../components/Products/ProductsGrid'
import { IoFilter } from "react-icons/io5";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilter } from '../../redux/slices/productsSlice';

const CollectionPage = ({id,setId}) => {
    const {collection}=useParams()
    const [searchParams]=useSearchParams()
    const dispatch=useDispatch()
    const {products,loading,error}=useSelector((state)=>state.products)
    const queryParams=Object.fromEntries([...searchParams])
    // const [products,setProducts]=useState([])
    const [showFilterBar,setShowFilterBar]=useState(false)

    useEffect(()=>{
        dispatch(fetchProductsByFilter({collection,...queryParams}))
    },[dispatch,collection,searchParams])

    const handleFilterBar=()=>{
        setShowFilterBar(!showFilterBar)
    }
    
      
    
    

  return (
    <section className='w-full  mt-[80px] md:mt-[100px] flex relative'>
        {/* {mobile filter} */}
        <div className={`fixed h-full w-[50%]  md:hidden overflow-y-scroll  border-green-400 bg-white  top-[80px] duration-100 z-3 ${showFilterBar?"translate-x-0":"-translate-x-full"}`}>
            <FilterSidebar/>
        </div>
        <div className={` fixed overlay w-screen h-screen top-0  border-yellow-300 bg-gray-500 opacity-23 z-2 ${showFilterBar?"block":"hidden"} `} onClick={handleFilterBar}>

        </div>
        {/* {desktop filter} */}    
        <div className={`w-[20%] hidden fixed h-full left-0 bg-white overflow-y-scroll border md:block transform-all `}>
            <FilterSidebar/>
        </div>
        <div className='w-full md:w-[80%] p-3 relative md:left-[20%] '>
            <div>
                <div className='text-2xl font-bold mt-1 md:mt-5'>ALL COLLECTIONS</div>
                <div className='flex justify-center items-center gap-2 md:hidden text-[15px]' onClick={handleFilterBar}>
                    <IoFilter/>Filter</div>
                    <div className='flex justify-end items-center'>
                        <p className='text-right'>Sort</p>
                        <SortOptions/>
                    </div>
            </div>
            <ProductsGrid id={id} setId={setId}  products={products} loading={loading} error={error}/>
        </div>
    </section>
  )
}

export default CollectionPage
