import React, { useState,useEffect } from 'react'
import Hero from '../components/Layout/Hero'
import Gendercollectionsection from '../components/Products/Gendercollectionsection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import Features from '../components/Products/Features'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


const Home = () => {
  const dispatch=useDispatch()
  // const {products,loading,error}=useSelector((state)=>state.products)
  const [bestSellerProduct,setBestSellerProduct]=useState(null)


  //fetch best seller product
  useEffect(()=>{
    const fetchBestSeller=async()=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setBestSellerProduct(response.data)
      } catch (error) {
        console.log(error)
        
      }
    }
    fetchBestSeller()

  },[dispatch])


  return (
    <div  >
      <Hero/>
      <Gendercollectionsection/>
      <NewArrivals/>
      <h2 className='text-3xl text-center font-bold mt-5'>Best Seller</h2>
      {bestSellerProduct?(<ProductDetails productId={bestSellerProduct._id} />):(<p>Loading best seller product...</p>)}
      <Features/>
      <FeaturesSection/>
    </div>
  )
}

export default Home
