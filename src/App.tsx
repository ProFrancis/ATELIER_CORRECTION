import { Routes, Route } from 'react-router-dom'

// PAGES ADMIN 
import AdminUser from './admin/pageUser/AdminUser'
import AdminArticle from './admin/pageArticle/AdminArticle'
import Dashboard from './admin/pageDashboard/Dashboard'

// PAGES AND COMPONENTS
import Home from './pages/pageHome/Home'
import Sign from './pages/pageAuth/Sign'
import SignUp from './pages/pageAuth/SignUp'
import Detail from './pages/pageDetail/Detail'
import Loyout from './components/loyout/Loyout'
import NotFound from './pages/pageNotFound/NotFound'
import Panier from './pages/pagePanier/Panier'

// SERVICES
import PublicRoute  from './utils/helpers/PublicRoute'
import PrivateRoute from './utils/helpers/PrivateRoute'

// CSS 
import './App.css'

function App() {
  return (
   <Routes >
      <Route path='/' element={<Loyout/>}>
        <Route index element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/panier' element={<Panier/>} />
        <Route path='*' element={<NotFound/>} />
        <Route element={<PublicRoute/>} >
          <Route path='/sign' element={<Sign/>} /> 
          <Route path='/signup' element={<SignUp/>} />
        </Route>
      </Route>
      <Route element={<PrivateRoute/>} >
        <Route path='/admin' element={<Dashboard/>}>
          <Route path='/admin/user' element={<AdminUser />} />
          <Route path='/admin/article' element={<AdminArticle />} />
        </Route>
      </Route>
   </Routes>
  )
}

export default App
