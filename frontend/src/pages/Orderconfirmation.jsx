import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../redux/slices/cartSlice'

const Orderconfirmation = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {checkout}=useSelector((state)=>state.checkout)
  console.log(checkout)


  //clear the cart when order is confirmed

  useEffect(()=>{
    if(checkout&&checkout._id){
      dispatch(clearCart())
      localStorage.removeItem("cart")
    }
   
  },[checkout,dispatch,navigate])
   if (!checkout) {
    return <div className='mt-[100px] text-center'>Loading order details...</div>
  }

  return (
    <div className='mt-[100px]'>
      <div className="container w-full   md:w-[50%] mx-auto p-4 m-5 shadow-md ">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        <p className="mb-2 text-green-500 text-2xl font-bold">Thank you for your order!</p>
        <p className="mb-2 font-bold">Order ID: #{checkout._id}</p>
        <p className="mb-2">Order Date: {new Date(checkout.createdAt).toDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Shipping Address</h2>
        <p>{checkout.shippingAddress.address}</p>
        <p>{checkout.shippingAddress.city}</p>
        <p>{checkout.shippingAddress.country}</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Order Items</h2>
        <ul className="list-disc pl-5">
          {checkout.checkoutItems.map((item,index) => (
            <div key={index} className='flex  p-1 rounded shadow-md justify-between mb-2'>
                    <div className='w-[10%] flex justify-center   items-center ml-2 '>
                        <img  className='object-cover rounded-md' src={item.image}/>
                    </div>
                    <div className='flex flex-col ml-4 w-[70%] '>
                    <h3 className='font-normal text-[15px]'>{item.name}</h3>
                    <span className='text-sm text-gray-700'>Brand -{item.brand} | Size:-{item.size}</span>
                    </div>
                    <div className=' w-[20%] flex  flex-col items-end px-2'>
                                        <p className='text-1xl'>₹{item.price}</p>
                                        
                                    </div>
                    </div>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">Total Amount</h2>
        <p>₹ {checkout.checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
      </div>
      
    </div>
  )
}

export default Orderconfirmation
