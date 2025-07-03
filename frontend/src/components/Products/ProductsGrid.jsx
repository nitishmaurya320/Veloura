import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductsGrid = ({products,loading,error}) => {
    const navigate=useNavigate()
    
    const [id,setId]=useState("")
    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error : {error}</p>
    }
    
    const onProductClick=(id)=>{
        setId(id)
        navigate(`/product/${id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  return (
    <div className='grid grid-cols-2 md:grid-cols-4  w-full  '>
            {
                products.map((product,index)=>{
                        return(
                            <div key={index} className='w-full md:h-[400px]  p-1 hover:shadow-lg cursor-pointer ' onClick={()=>{onProductClick(product._id)}}>
                                <div><img loading='lazy' className=' w-full h-[200px] md:h-[320px]  object-cover  object-top' src={product.images[0].url}/></div>
                                <div className='p-2'>
                                    <h3 className='text-[13px] truncate'>{product.name}</h3>
                                    <p>₹{product.price}</p>
                                </div>
                                
                            </div>
                        )
                })
            }
        </div>
  )
}

export default ProductsGrid
