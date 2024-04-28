import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// CONTEXT
import { AuthContext } from '../../utils/context/AuthContext'
import { PanierContext } from '../../utils/context/PanierContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const { totalArticle } = useContext(PanierContext)

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/panier'>Panier</Link>({totalArticle()})</li>
          {user == null ?
            <>
              <li><Link to='/sign'>sign</Link></li>
              <li><Link to='/signup'>signup</Link></li>
            </>
          :
            <>
              <li ><Link to='/admin'>DashBoard</Link></li>
              <li onClick={logout}>Logout</li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header