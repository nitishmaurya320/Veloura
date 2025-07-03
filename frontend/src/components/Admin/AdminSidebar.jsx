import React from 'react'
import { FaUsers } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { NavLink,Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { clearCart } from '../../../redux/slices/cartSlice';

const AdminSidebar = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

    const menu=[
        {name:"Users",link:"/admin/users",icon:<FaUsers/>},
        {name:"Products",link:"/admin/products",icon:<MdOutlineProductionQuantityLimits/>},
        {name:"Orders",link:"/admin/orders",icon:<FaClipboardList/>},
        {name:"Shop",link:"/",icon:<FaShopify/>},
        
       
    ]

    const handleLogout=()=>{
      dispatch(logout())
      dispatch(clearCart())
      navigate("/")
    }
  return (  
    <div className='w-full  p-2'>
        <Link to="/admin">
        <h1 className='text-bold text-2xl'>Admin Dashboard</h1>
        </Link>
      <div>
        <ul className='flex flex-col p-5'>
            {
                menu.map((item,index)=>{
                    return(
                        <NavLink to={item.link} key={index} className={({isActive})=>isActive?"text-blue-500":"text-black"}>
                             <li  className='flex mt-5'>{item.icon}{item.name}</li>
                        </NavLink>
                       
                    )
                })
            }
        </ul>
      </div>
      <div>
        <Link to="/">
        <button onClick={handleLogout}  className='bg-red-500 text-white px-3 py-2 rounded-lg w-full'>Logout</button>
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar
