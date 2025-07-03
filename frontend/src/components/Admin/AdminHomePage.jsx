import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAdminProducts } from '../../../redux/slices/adminProductSlice'
import { fetchAllOrders } from '../../../redux/slices/adminOrderSlice'
const AdminHomePage = () => {
    const dispatch=useDispatch()
    const {products,loading:productsLoading,error:productsError}=useSelector((state)=>state.adminProducts)
    const {orders,totalOrders,totalSales,loading:ordersLoading,error:ordersError}=useSelector((state)=>state.adminOrders)

    useEffect(()=>{
      dispatch(fetchAdminProducts())
      dispatch(fetchAllOrders())
    }, [dispatch])
    console.log(orders)
  return (
    <div className=' w-full p-5'>
      <h1 className='text-[30px] font-bold text-center my-5'>
        Admin Dashboard
      </h1>

      {productsLoading&&ordersLoading?(<p>Loading...</p>):(productsError?(<p>Error Fetching products</p>):(ordersError?(<p>error fetching orders</p>):(
         <div className='grid grid-cols-3 gap-10'>
        <div className=' rounded shadow-md p-3'>
          <h2 className='text-[20px] font-bold '>Revenue</h2>
          <h3 className='text-[25px]'>Rs {totalSales}</h3>
        </div>
        <div className=' rounded shadow-md p-3'>
          <h2 className='text-[20px] font-bold '>Total Orders</h2>
          <h3 className='text-[25px]'>{totalOrders}</h3>
          <Link to="/admin/orders">Manage orders</Link>
        </div>
        <div className=' rounded shadow-md p-3'>
          <h2 className='text-[20px] font-bold '>Total Products</h2>
          <h3 className='text-[25px]'>{products.length}</h3>
          <Link to="/admin/products">Manage Products</Link>
        </div>
        </div>
      )))}
     
        <div className='w-full  p-2 mt-5'>
        <div className='text-2xl font-bold'>Recent Orders</div>
          <table className='text-left mt-3  w-full ' >
                     <thead className=' '>
                            <tr className=''>
                                
                                <th className='bg-gray-400 p-1'>Order Id</th>
                           
                                <th className='bg-gray-400 '>Users</th>
                                <th className='bg-gray-400 '>Total Price</th>
                                <th className='bg-gray-400 '>Status</th>
                            </tr>
        </thead>
                    <tbody>
                        {orders.map((order, index) => (
                          <tr key={index} className='hover:bg-gray-100 cursor-pointer'>
                                <td className='p-1'>#{order._id}</td>
                                <td>{order?.user?.name}</td>
                                <td>Rs. {order.totalPrice}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                       
                    </tbody>
                </table>
                </div>
        
      
    </div>
  )
}

export default AdminHomePage
