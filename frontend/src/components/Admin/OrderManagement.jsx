import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllOrders, updateOrderStatus } from '../../../redux/slices/adminOrderSlice'

const OrderManagement = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.auth)
    const  {orders,loading,error}  =useSelector((state)=>state.adminOrders)
    useEffect(()=>{
        if(!user||user.role!=="admin"){
            navigate("/")
        }
        else{
            dispatch(fetchAllOrders())
        }

    },[dispatch,user,navigate])

        const handleStatusChange=(orderId,status)=>{
            dispatch(updateOrderStatus({id:orderId,status}))
        }

        if  (loading) return <p>loading...</p>
        if(error) return <p>Error...{error}</p>
        console.log(orders)
  return (
    <div>
       <h2 className="text-xl font-semibold mt-6 mb-4">Order Management</h2>

                {orders.length>0?<table className='text-left w-full ' >
                     <thead className=' '>
                            <tr className=''>
                               
                                <th className='bg-gray-400 p-2'>Order Id</th>
                                <th className='bg-gray-400 '>Customer </th>
                                <th className='bg-gray-400 '>Total Price</th>
                                <th className='bg-gray-400 '>Status</th>
                                <th className='bg-gray-400 '>Actions</th>
                                
                            </tr>
        </thead>
                    
                        
                            
                            <tbody>
                            {orders.map((order, index) => (
                            <tr key={index} className='border border-gray-400'>
                                {/* <td><img className='w-10 h-10 object-cover border' src={item.image} alt={item.name}/></td> */}
                                <td className='p-2'>#{order._id}</td>
                                {/* <td>{new Date(orderDetails.createdAt).toLocaleDateString()}</td> */}
                                <td>{order.user?.name}</td>
                                {/* <td>{item.quantity}</td> */}
                                <td>Rs. {order.totalPrice}</td>
                                <td>
                                    <select value={order.status} onChange={(e)=>handleStatusChange(order._id,e.target.value)}>
                                        <option>Processing</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button className='bg-green-400 rounded cursor-pointer px-2 py-1' onClick={()=>{handleStatusChange(order._id,"Delivered")}}>Mark as Delivered</button>
                                </td>
                            </tr>
                            
                        ))}
                        </tbody>:
                        
                        
                    
                </table>:<p>No orders found</p>}
                
    </div>
  )
}

export default OrderManagement
