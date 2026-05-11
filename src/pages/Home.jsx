import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    const [propiedades, setPropiedades] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                const res = await axios.get('https://inmobiliaria-prado-backend.onrender.com/api/publicaciones')
                setPropiedades(res.data)
                setLoading(false)
            } catch (error) {
                console.error("Error al cargar propiedades", error)
                setLoading(false)
            }
        }
        fetchPropiedades()
    }, [])

    const propiedadesFiltradas = propiedades.filter((p) =>
        p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.ubicacion?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.colonia?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.ciudad?.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <div className="home-container">
            {/* sección hero */}
            <section 
                className="hero bg-dark text-white text-center shadow-lg" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/assets/merida.png")', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed', 
                    minHeight: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    color: "white"
                }}
>
    <div className="container">
        
        <h1 className="display-3 fw-bold text-uppercase tracking-wider" 
            style={{ 
                letterSpacing: '3px',
                textShadow: '2px 2px 8px rgba(255, 255, 255, 0.7)' 
            }}
        >
            INMOBILIARIA PRADO
        </h1>
        <p className="lead fs-4 fw-light mt-3" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            Tu hogar o inversión en la ciudad de Mérida, Yucatán.
        </p>
        <hr className="mx-auto" style={{ width: '100px', borderTop: '4px solid white', opacity: '1', marginTop: '30px' }} />
    </div>
</section>

            {/* sección quienes somos */}
            <section id="quienes-somos-text" className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-5 text-center mb-4 mb-md-0">
                        <img 
                            src="/assets/sele.png" 
                            alt="Asesora Selene Sarmiento" 
                            className="img-fluid rounded-circle shadow-lg" 
                            style={{ width: '300px', height: '300px', objectFit: 'cover', border: '5px solid white' }}
                        />
                        <h4 className="mt-3 fw-bold">Selene Sarmiento Prado</h4>
                        <p className="text-muted text-uppercase small">Asesora Certificada AMPI</p>
                    </div>
                    <div className="col-md-7">
                        <h2 className="fw-bold mb-4">¿Quiénes Somos?</h2>
                        <p className="lead text-secondary">
                            Somos una inmobiliaria ubicada en la próspera ciudad de Mérida, Yucatán. 
                            Nos dedicamos a conectar personas con su espacio ideal, ya sea para vivir 
                            o como una inversión estratégica en el sureste mexicano.
                        </p>
                        <p className="text-secondary">
                            Nuestra misión es brindar asesoría profesional y transparente, 
                            asegurando que cada transacción sea segura y satisfactoria para nuestros clientes.
                        </p>
                    </div>
                </div>
            </section>

            {/* sección propiedades */}
            <section id="Propiedades" className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center fw-bold mb-4 text-uppercase">Nuestras Propiedades</h2>

                    {/* buscador */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6">
                            <div className="input-group input-group-lg shadow-sm">
                                <span className="input-group-text bg-white border-end-0">
                                    <FaSearch className="text-muted" />
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-start-0 ps-0" 
                                    placeholder="Buscar por zona, título o ciudad..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* cards */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-dark" role="status"></div>
                            <p className="mt-2 text-muted">Cargando propiedades...</p>
                        </div>
                    ) : (
                        <div className="row">
                            {propiedadesFiltradas.length > 0 ? (
                                propiedadesFiltradas.map((p) => (
                                    <div className="col-md-4 mb-4" key={p._id}>
                                        <div className="card h-100 shadow-sm border-0 card-hover overflow-hidden">
                                            {/* carrusel */}
                                            <div className="position-relative">
                                                {p.multimedia && p.multimedia.length > 0 ? (
                                                    <Swiper
                                                        modules={[Navigation, Pagination]}
                                                        navigation
                                                        pagination={{ clickable: true }}
                                                        style={{ height: '240px' }}
                                                    >
                                                        {p.multimedia.map((img, idx) => (
                                                            <SwiperSlide key={idx}>
                                                                <img 
                                                                    src={img} 
                                                                    className="card-img-top w-100 h-100" 
                                                                    alt={`${p.titulo}-${idx}`}
                                                                    style={{ objectFit: 'cover' }}
                                                                />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                ) : (
                                                    <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '240px' }}>
                                                        <span className="text-white">Sin imagen disponible</span>
                                                    </div>
                                                )}
                                                
                                                <span className="badge bg-dark position-absolute top-0 end-0 m-3 p-2 shadow-sm" style={{ zIndex: 10 }}>
                                                    {p.tipoOperacion || 'VENTA'} ${p.precio?.toLocaleString('es-MX')} MXN
                                                </span>
                                            </div>

                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title text-uppercase fw-bold text-truncate" title={p.titulo}>
                                                    {p.titulo}
                                                </h5>
                                                <p className="text-muted small">
                                                    <FaMapMarkerAlt className="me-1 text-danger" /> 
                                                    {p.colonia}{p.ciudad ? `, ${p.ciudad}` : ''}
                                                </p>
                                                
                                                <div className="d-flex justify-content-between text-secondary mb-3 border-top pt-2">
                                                    <span>
                                                        <FaBed className="me-1" /> 
                                                        {p.recamaras || 0} {p.recamaras === 1 ? 'Recámara' : 'Recámaras'}
                                                    </span>
                                                    <span>
                                                        <FaBath className="me-1" /> 
                                                        {p.banos || 0} {p.banos === 1 ? 'Baño' : 'Baños'}
                                                    </span>
                                                </div>

                                                <Link to={`/propiedad/${p._id}`} className="btn btn-outline-dark w-100 mt-auto fw-bold">
                                                    VER DETALLES
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <div className="mb-3">
                                        <FaSearch size={50} className="text-muted opacity-25" />
                                    </div>
                                    <h4 className="fw-bold">No se encontraron resultados</h4>
                                    <p className="text-muted">Prueba con otros términos o limpia el buscador.</p>
                                    <button className="btn btn-link text-dark" onClick={() => setBusqueda('')}>
                                        Ver todas las propiedades
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home;