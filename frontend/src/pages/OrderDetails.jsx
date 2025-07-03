import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderDetails } from '../../redux/slices/orderSlice'
const OrderDetails = () => {
    const {id}= useParams()
    // const [orderDetails, setOrderDetails] = useState(null);
    const dispatch= useDispatch()
    const {orderDetails,loading,error}=useSelector((state)=>state.orders)
    useEffect(()=>{
        dispatch(fetchOrderDetails(id))
    },[dispatch,id])

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error {error}</p>

   


  return (
    <div className='mt-[100px]'>
        <div className="container mx-auto p-4 w-full  md:min-w-[700px]">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <div className='bg-gray-50 rounded-lg p-4  text-[13px] md:text-[15px] shadow-md w-full md:w-[70%] flex-wrap  mx-auto'>
              {orderDetails ? (
            <>
                <div className='flex justify-between'>
                    <p className="mb-2">Order ID: #{orderDetails._id}</p>
                    {
                    orderDetails.isPaid ? (
                        <p className='text-green-500 font-bold'>PAID</p>
                    ) : (
                        <p className='text-red-500 font-bold'>PENDING</p>
                    )
                    }
                </div>
                <div className='flex justify-between'>
                <p className="mb-2">Order Date: {new Date(orderDetails.createdAt).toLocaleDateString("en-GB")}</p>
                {
                    orderDetails.isDelivered?
                    <p className='text-green-400'>Delivered</p>:<p className='text-red-500'>pending</p>
                }
                </div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold'>Payment info</h1>
                        <p className="mb-2">Payment Method: {orderDetails.paymentMethod}</p>
                    </div>
                    
                <div >
                    <h1 className='font-bold'>Shipping info</h1>
                    
                    <p className="mb-2">Shipping Address: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>

                </div>
                </div>
                <div className='flex w-full justify-end'>
                    {
                    orderDetails.isDelivered?
                    <p className='text-green-400'></p>:<p >Delivery By {new Date(new Date(orderDetails.createdAt).setDate(new Date(orderDetails.createdAt).getDate() + 5)).toDateString()}
                    </p>
                }
                    
                </div>
                <h2 className="text-xl font-semibold mt-6 mb-4">Order Items</h2>
                <table className='text-left  w-full ' >
                     <thead className=' '>
                            <tr className='text-center '>
                                <th className='bg-gray-400 p-2 '>Image</th>
                                <th className='bg-gray-400'>Name</th>
                               
                                {/* <th className='bg-gray-400 '>Created </th> */}
                                {/* <th className='bg-gray-400 '>Shipping Address</th> */}
                                <th className='bg-gray-400 w-[60px]'>Items</th>
                                <th className='bg-gray-400 w-[70px] '>Price</th>
                                <th  className='bg-gray-400 p-2 '>Status</th>
                            </tr>
        </thead>
                    <tbody>
                        {orderDetails.orderItems.map((item, index) => (
                            <tr className='text-center' key={index}>
                                <td className='py-1'><img className='w-10 h-10 object-cover  ' src={item.image} alt={item.name}/></td>
                                
                                <td className='text-[14px] '>{item.name}</td>
                                {/* <td>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</td> */}
                                <td>{item.quantity}</td>
                                <td>₹   {item.price}</td>
                                <td>{orderDetails.isPaid ? <p className='text-green-500 font-bold'>PAID</p> : <p className='text-red-500 font-bold'>PENDING</p>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/my-orders" className='text-blue-500 underline mt-4'>Back to My Orders</Link>
                
                

            </>
            ) : (
            <p>Loading order details...</p>
            )}
          </div>
        </div>
      
    </div>
  )
}

export default OrderDetails
