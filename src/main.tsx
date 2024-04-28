import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// CONTEXT
import { AuthProvider } from './utils/context/AuthContext'
import { PanierProvider } from './utils/context/PanierContext.tsx'
import { StripeProvider } from './utils/context/StripeContext.tsx'

// REDUX
import store from "./redux/store"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <AuthProvider>
        <PanierProvider>
          <StripeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </StripeProvider>
        </PanierProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
