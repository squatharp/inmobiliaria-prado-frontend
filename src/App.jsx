import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header' 
import Home from './pages/Home' 
import Login from './pages/Login'
import Register from './pages/Register'
import Publish from './pages/Publish' 
import PropertyDetail from './pages/PropertyDetail' 

const App = () => {
  return (
    <>
      <Router>
        <Header />
        
        <main>
          <Routes>
            {/* Ruta principal: muestra el hero, quiénes Somos y propiedades */}
            <Route path='/' element={<Home />} />
            
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
            {/* Ruta para publish */}
            <Route path='/publicar' element={<Publish />} />
            
            {/* Ruta dinámica para ver PropertyDetail */}
            <Route path='/propiedad/:id' element={<PropertyDetail />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App