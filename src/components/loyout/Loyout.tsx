import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

const Loyout = () => {
  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer/>
    </>
  )
}

export default Loyout