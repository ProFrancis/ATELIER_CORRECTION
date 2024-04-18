import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

// CONTEXT
import { AuthContext } from './utils/context/AuthContext'

// PAGES ADMIN 
import Dashborard from './components/admin/template/Dashborard'
import AdminArticle from './admin/pageArticle/AdminArticle'
import AdminUser from './admin/pageUser/AdminUser'

// PAGES AND COMPONENTS
import Loyout from './components/loyout/Loyout'
import Sign from './pages/pageAuth/Sign'
import SignUp from './pages/pageAuth/SignUp'
import Home from './pages/pageHome/Home'
import NotFound from './pages/pageNotFound/NotFound'


// CSS 
import './App.css'


function App() {
  const { isLoading, user } = useContext(AuthContext);

  return (
   <Routes>
      <Route path='/' element={<Loyout/>}>
        <Route index element={<Home/>} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound/>} />
      </Route>
      {user != null && user.role === 'admin' &&
        <Route path='/admin' element={<Dashborard/>}>
          <Route path='/admin/article' element={<AdminArticle />} />
          <Route path='/admin/article' element={<AdminArticle />} />
          <Route path='/admin/user' element={<AdminUser />} />
        </Route>
      }
   </Routes>
  )
}

export default App
