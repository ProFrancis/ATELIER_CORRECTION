import { Routes, Route } from 'react-router-dom'

// PAGES ADMIN 
import AdminUser from './admin/pageUser/AdminUser'
import AdminArticle from './admin/pageArticle/AdminArticle'
import Dashborard from './components/admin/template/template'

// PAGES AND COMPONENTS
import Home from './pages/pageHome/Home'
import Sign from './pages/pageAuth/Sign'
import SignUp from './pages/pageAuth/SignUp'
import Loyout from './components/loyout/Loyout'
import NotFound from './pages/pageNotFound/NotFound'

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
        <Route path='*' element={<NotFound/>} />
        <Route element={<PublicRoute/>} > {/* Public route bloque l'acces aux pages qui ne doivent pas s'afficher quand nous sommes connecté */}
          <Route path='/sign' element={<Sign/>} /> 
          <Route path='/signup' element={<SignUp/>} />
        </Route>
      </Route>
      <Route element={<PrivateRoute/>} >
        <Route path='/admin' element={<Dashborard/>}>
            <Route path='/admin/user' element={<AdminUser />} />
            <Route path='/admin/article' element={<AdminArticle />} />
          </Route>
      </Route>
   </Routes>
  )
}

export default App
