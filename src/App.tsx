import { Routes, Route } from 'react-router-dom'
import Loyout from './components/loyout/Loyout'

import './App.css'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Loyout/>}>
      

    </Route>
   </Routes>
  )
}

export default App
