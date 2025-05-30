import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { BackendProvider } from './context/BackendContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BackendProvider>
        <App />
      </BackendProvider>
    </BrowserRouter>
  </StrictMode>,
)
