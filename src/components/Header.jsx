import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    {/* logo a la izquierda */}
                    <Link className="navbar-brand" to="/">
                        <img 
                            src="/assets/prado.png" 
                            alt="Logo Inmobiliaria" 
                            width="80px" 
                            height="80px" 
                        />
                    </Link>

                    {/* botón para móviles */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarColor01" 
                        aria-controls="navbarColor01" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        {/* enlaces de navegación a la izquierda  */}
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/#quienes-somos-text">¿Quiénes Somos?</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#Propiedades">Propiedades</a>
                            </li>
                        </ul>

                        {/* botones de auth */}
                        <ul className="navbar-nav ms-auto">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/publicar">
                                            <FaPlus className="me-1" /> Publicar
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-link nav-link" onClick={onLogout}>
                                            <FaSignOutAlt className="me-1" /> Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            <FaSignInAlt className="me-1" /> Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            <FaUser className="me-1" /> Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header