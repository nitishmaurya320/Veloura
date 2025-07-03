import React, { useEffect } from 'react'
import ProductDetails from './ProductDetails'
import ProductsGrid from './ProductsGrid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSimilarProducts } from '../../../redux/slices/productsSlice'
import { useParams } from 'react-router-dom'

const Product = () => {
  const {id}=useParams()
    const dispatch=useDispatch()
        const {similarProducts,loading,error}=useSelector((state)=>state.products)

         useEffect(()=>{
                dispatch(fetchSimilarProducts(id))
            },[dispatch])
  return (
    <div className='mt-[100px]'>
      <ProductDetails productId={id}/>
        <h1 className='text-center text-2xl font-bold mb-5'>Similar Products</h1>
      <div className='w-[90%] mx-auto'>
        <ProductsGrid  products={similarProducts} loading={loading} error={error}/>
      </div>
    </div>
  )
}

export default Product
