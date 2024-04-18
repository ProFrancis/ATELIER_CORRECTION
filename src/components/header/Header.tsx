import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// CONTEXT
import { AuthContext } from '../../utils/context/AuthContext'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  
  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          {user == null ?
          <>
            <li><Link to='/sign'>sign</Link></li>
            <li><Link to='/signup'>signup</Link></li>
          </>
          :
          <li onClick={logout}>Logout</li>
        }
        </ul>
      </nav>
    </header>
  )
}

export default Header