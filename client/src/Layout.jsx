import React from 'react'
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import Header from './components/Header'
import Footer from './components/FooterCom'
function Layout() {
  // const {theme} = useSelector(state=>state.theme)
  return (
    <>
      {/* <div className={theme}>
        <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'> */}
          <Header/>
          <Outlet/>
          <Footer/>
        {/* </div>
      </div>  */}
    </>
  )
}

export default Layout