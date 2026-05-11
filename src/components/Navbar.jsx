import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/assets/prado.png" alt="Logo" width="80" />
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#quienes-somos">¿Quiénes Somos?</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#propiedades">Propiedades</a>
                        </li>
                    </ul>
                    
                    <div className="d-flex gap-2">
                        {user ? (
                            <>
                                <Link className="btn btn-outline-light" to="/publicar">Publicar</Link>
                                <button className="btn btn-light" onClick={onLogout}>Cerrar Sesión</button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-light" to="/login">Login</Link>
                                <Link className="btn btn-light" to="/register">Registro</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};