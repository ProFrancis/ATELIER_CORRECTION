import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// CONTEXT
import { AuthProvider } from './utils/context/AuthContext'
import { PanierProvider } from './utils/context/PanierContext.tsx'

// REDUX
import store from "./redux/store"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <AuthProvider>
        <PanierProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PanierProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
