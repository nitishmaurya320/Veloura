import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, fetchAdminProducts } from '../../../redux/slices/adminProductSlice'
const ProductManagement = () => {
   const dispatch=useDispatch()
   const navigate=useNavigate();
   const {products,loading,error} =useSelector((status)=>status.adminProducts)

   useEffect(()=>{
    dispatch(fetchAdminProducts())
   },[dispatch])

    const handleDeleteProduct=(id)=>{
        if(window.confirm("Are you sure to delete this product")){
            dispatch(deleteProduct(id))
            console.log("Deleted")
        }
        else{

        }
    }

    if  (loading) return <p>loading...</p>
        if(error) return <p>Error...{error}</p> 
  return (
    <div className='w-full'>
        <h1 className='text-2xl font-bold'>Product Management</h1>
        <div className='w-full mt-5'>
            {products.length>0?<table className='text-left w-full ' >
                     <thead className=' '>
                            <tr className=''>
                                <th className=' w-1/4 bg-gray-400 p-2 '>Name</th>
                                <th className=' w-1/4 bg-gray-400 '>Price</th>
                                <th className='bg-gray-400 w-1/4 '>SKU </th>
                                <th className='bg-gray-400 w-1/4'>Actions</th>
                                
                            </tr>
        </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr className='border border-gray-400 py-3 h-[20px]' key={index}>
                                <td className='p-2'>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    {product.sku}
                                </td>
                                <td className='py-2 space-x-3'>
                                   <Link to={`/admin/products/${product._id}/edit`}>
                                        <button  className='bg-green-400 rounded-md px-3 hover:bg-green-600'>
                                            EDIT
                                        </button>
                                   </Link>
                                   <button className='bg-red-500 hover:bg-red-400 text-white rounded-md px-3' onClick={()=>{handleDeleteProduct(product._id)}}>Delete</button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>:<p>No products found</p>}
        </div>
     
    </div>
  )
}

export default ProductManagement
