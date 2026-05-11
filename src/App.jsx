import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Componentes
import Header from './components/Header' // Este funcionará como tu Navbar superior

// Páginas
import Home from './pages/Home' // Cambiaremos 'Dashboard' por 'Home' para la página principal
import Login from './pages/Login'
import Register from './pages/Register'
import Publish from './pages/Publish' // La página para subir propiedades
import PropertyDetail from './pages/PropertyDetail' // La página de detalles de cada casa

const App = () => {
  return (
    <>
      <Router>
        {/* El Header se mantiene fijo arriba en todas las páginas */}
        <Header />
        
        {/* Eliminamos el div 'container' de aquí para que secciones como el 
            Hero puedan ocupar todo el ancho de la pantalla como en tu borrador */}
        <main>
          <Routes>
            {/* Ruta principal: Muestra el Hero, Quiénes Somos y Propiedades */}
            <Route path='/' element={<Home />} />
            
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
            {/* Ruta para que el administrador publique nuevas casas */}
            <Route path='/publicar' element={<Publish />} />
            
            {/* Ruta dinámica para ver el detalle de una propiedad específica */}
            <Route path='/propiedad/:id' element={<PropertyDetail />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App