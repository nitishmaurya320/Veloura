import React, { useState } from 'react'
import { HiMiniBars3 } from "react-icons/hi2";
import AdminSidebar from './AdminSidebar';
import AdminHomePage from './AdminHomePage';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };  
  return (
    <div className=' h-screen w-full'>
        <div className={` fixed overlay w-full h-screen top-0  border-yellow-300 bg-gray-500 opacity-23 z-2 ${isSidebarOpen?"block":"hidden"} `} onClick={toggleSidebar}>

        </div>
        <div className='fixed top-0 w-full p-3   h-[100px] bg-violet-950 z-50 flex justify-between items-center '>
            <div className='w-full'>
                <HiMiniBars3 className='text-2xl text-white  md:hidden ml-1  'onClick={toggleSidebar} />
            <h1 className='text-3xl text-white font-bold '>Admin Dashboard</h1>
        </div>
        </div>
        {/* sidebar / */}
        <div className={`fixed duration-300 left-0 h-full border-5 border-yellow-400 z-50  w-[250px] bg-white ${isSidebarOpen?"translate-x-[0px]":"-translate-x-full"} ` }>
            <AdminSidebar/>
        </div>
        
       <div className='flex border  w-full mt-[100px]'>
            <div className='w-[20%] hidden md:block'>
                <AdminSidebar/>
            </div>
            <main className='w-full md:w-[80%] p-5'>    
                <Outlet>
                    <AdminHomePage/>
                </Outlet>
            </main>
       </div>
    </div>
  )
}

export default AdminLayout
