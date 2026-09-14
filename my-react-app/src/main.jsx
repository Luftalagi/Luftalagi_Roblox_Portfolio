import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Modeling from './pages/Modeling.jsx'
import Building from './pages/Building.jsx'
import Environments from './pages/Environments.jsx'
import Scripting from './pages/Scripting.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/scripting" element={<Scripting />} />
        <Route path="/modeling" element={<Modeling />} />
        <Route path="/building" element={<Building />} />
        <Route path="/environments" element={<Environments />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
