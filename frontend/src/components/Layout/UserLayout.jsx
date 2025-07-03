import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home'
const UserLayout = () => {
  return (
    <div className='userlayout'>
      <Header/>
      <main>
        <Outlet>
            <Home/>
        </Outlet>
      </main>
      <Footer/>
    </div>
  )
}

export default UserLayout
