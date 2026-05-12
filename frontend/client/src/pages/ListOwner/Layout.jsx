import React from 'react'
import Navbar from '../../components/ListOwner/Navbar'
import Sidebar from '../../components/ListOwner/Sidebar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex h-full'>
        <Sidebar />
        <div className='flex-1 p-4 pt-10 md:px-10 h-full overflow-auto'>
        <Outlet/>
        </div>

      </div>
      
      <Footer />
    </div>
  )
}

export default Layout
