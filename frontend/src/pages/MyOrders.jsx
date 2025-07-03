import React, { useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchUserOrders } from '../../redux/slices/orderSlice';

const MyOrders = ({margin}) => {
    
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {loading,error,orders}=useSelector((state)=>state.orders)

    useEffect(()=>{
        dispatch(fetchUserOrders())
    },[dispatch])
    
   
    const handleRowClick =(orderId) =>{
        navigate(`/orders/${orderId}`);
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error {error}</p>
    
   
  return (
    <div className={`w-full overflow-y-scroll p-5  md:px-[50px]  h-full  mt-[${margin}px]`}>
        <h1 className='text-2xl font-bold'>My-Orders</h1>
       <table className='text-left mt-5 w-full   '>
        <thead className=''>
            <tr className='w-full text-center'>
                <th className='bg-gray-400 p-2'>Image</th>
                <th className='bg-gray-400'>Name</th>
                
                <th className='bg-gray-400 md:table-cell hidden'>Created </th>
                <th className='bg-gray-400 md:table-cell hidden'>Shipping Address</th>
                <th className='bg-gray-400 '>Items</th>
                <th className='bg-gray-400 '>Price</th>
                <th className='bg-gray-400 w-[70px] md:w-[100px] '>Status</th>
            </tr>
        </thead>
        <tbody>
           {orders.length>0?(
             
                orders.map((order)=>{
                    return(
                        <tr key={order._id} onClick={()=>{handleRowClick(order._id)}} className='cursor-pointer text-center hover:bg-gray-100'>
                            <td ><img className='w-10 h-10 object-cover mt-1 ' src={order.orderItems[0].image}/></td>
                            <td>{order.orderItems[0].name}</td>
                            
                            <td className='md:table-cell hidden'>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className='md:table-cell hidden'>{order.shippingAddress.city},{order.shippingAddress.country},{order.shippingAddress.pincode}</td>
                            <td>{(order.orderItems.length)}</td>
                            <td>{`₹${order.totalPrice}`}</td>
                            <td>{order.isPaid? <p className='text-green-500 font-bold '>PAID</p>:<p className='text-red-500 font-bold '>PENDING</p>}</td>

                        </tr>
                        
                        
                    )
                })
            
            
           ):
                <tr>
                    <td>You have empty cart</td>
                </tr>
            }
        </tbody>
        
       </table>


      
    </div>
  )
}

export default MyOrders
