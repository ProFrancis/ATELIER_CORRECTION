import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign'>sign</Link></li>
          <li><Link to='/signup'>signup</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header