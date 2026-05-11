import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaArrowLeft, FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined, FaHome, FaToilet } from 'react-icons/fa';

// Swiper para el carrusel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyDetail = () => {
    const { id } = useParams();
    const [propiedad, setPropiedad] = useState(null);

    useEffect(() => {
        const getPropiedad = async () => {
            try {
                const res = await axios.get(`https://inmobiliaria-prado-backend.onrender.com/api/publicaciones/${id}`);
                setPropiedad(res.data);
                document.title = `${res.data.titulo} | Inmobiliaria Prado`;
            } catch (error) {
                console.error("Error al obtener la propiedad", error);
            }
        };
        getPropiedad();
    }, [id]);

    if (!propiedad) return (
        <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status"></div>
            <p className="mt-2 text-muted">Cargando información detallada...</p>
        </div>
    );

    return (
        <div className="container py-5">
            <Link to="/" className="btn btn-link text-decoration-none mb-4 ps-0 text-dark fw-bold">
                <FaArrowLeft className="me-2" /> VOLVER AL CATÁLOGO
            </Link>

            <div className="row">
                {/* COLUMNA IZQUIERDA: IMÁGENES */}
                <div className="col-lg-8 mb-4">
                    <div className="shadow-lg rounded overflow-hidden">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000 }}
                            style={{ height: '550px' }}
                        >
                            {propiedad.multimedia && propiedad.multimedia.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} className="w-100 h-100" alt={propiedad.titulo} style={{ objectFit: 'cover' }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* COLUMNA DERECHA: INFORMACIÓN DETALLADA */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <div className="mb-2">
                            <span className="badge bg-dark me-2">{propiedad.tipoDeOperacion}</span>
                            <span className="badge bg-outline-dark text-dark border border-dark">
                                {propiedad.tipoDePropiedad === 'Otro' ? propiedad.otroTipoDePropiedad : propiedad.tipoDePropiedad}
                            </span>
                        </div>
                        
                        <h2 className="text-uppercase fw-bold mb-1">{propiedad.titulo}</h2>
                        <p className="text-muted small">
                            <FaMapMarkerAlt className="text-danger me-1" />
                            {propiedad.colonia}, {propiedad.ciudad}, {propiedad.estado}
                        </p>
                        
                        <h3 className="text-dark fw-bold my-3">
                            ${propiedad.precio?.toLocaleString('es-MX')} <small className="text-muted fs-6">MXN</small>
                        </h3>
                        
                        <hr />
                        
                        {/* ICONOS PRINCIPALES (HAB / BAÑOS) */}
                        <div className="row text-center mb-4 g-2">
                            {propiedad.recamaras > 0 && (
                                <div className="col border-end">
                                    <FaBed size={20} className="text-dark mb-1" />
                                    <p className="small mb-0 fw-bold">{propiedad.recamaras}</p>
                                    <p className="small text-muted mb-0">Rec.</p>
                                </div>
                            )}
                            <div className="col border-end">
                                <FaBath size={18} className="text-dark mb-1" />
                                <p className="small mb-0 fw-bold">{propiedad.banos}</p>
                                <p className="small text-muted mb-0">Baños</p>
                            </div>
                            {propiedad.mediosBaños > 0 && (
                                <div className="col">
                                    <FaToilet size={18} className="text-dark mb-1" />
                                    <p className="small mb-0 fw-bold">{propiedad.mediosBanos}</p>
                                    <p className="small text-muted mb-0">1/2 B.</p>
                                </div>
                            )}
                        </div>

                        {/* DATOS DE CONSTRUCCIÓN Y TERRENO (SOLO SI EXISTEN) */}
                        <div className="bg-light p-3 rounded mb-4">
                            <div className="row">
                                {propiedad.construccion > 0 && (
                                    <div className="col-6 mb-2">
                                        <small className="text-muted d-block text-uppercase" style={{fontSize: '0.7rem'}}>Construcción</small>
                                        <FaHome className="me-1" /> <strong>{propiedad.construccion} m²</strong>
                                    </div>
                                )}
                                {propiedad.terreno > 0 && (
                                    <div className="col-6 mb-2">
                                        <small className="text-muted d-block text-uppercase" style={{fontSize: '0.7rem'}}>Terreno</small>
                                        <FaRulerCombined className="me-1" /> <strong>{propiedad.terreno} m²</strong>
                                    </div>
                                )}
                            </div>
                        </div>

                        <h5 className="fw-bold text-uppercase small border-bottom pb-2">Descripción</h5>
                        <p className="text-secondary" style={{ textAlign: 'justify', fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
                            {propiedad.descripcion}
                        </p>

                        <div className="mt-auto">
                            <a 
                                href={`https://api.whatsapp.com/send?phone=522292283223&text=Hola! Me interesa la propiedad "${propiedad.titulo}" en ${propiedad.colonia}.`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success btn-lg w-100 shadow-sm d-flex align-items-center justify-content-center py-3 fw-bold"
                            >
                                <FaWhatsapp size={22} className="me-2" /> CONTACTAR ASESOR
                            </a>
                            <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.7rem' }}>
                                REFERENCIA ID: {propiedad._id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;