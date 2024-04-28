import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Tempalte = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
          <li>
              <Link to='/admin'>DashBoard</Link>
            </li>
            <li>
              <Link to='/'>App</Link>
            </li>
            <li>
              <Link to='/admin/article'>Article</Link>
            </li>
            <li>
              <Link to='/admin/user'>User</Link>
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  )
}

export default Tempalte