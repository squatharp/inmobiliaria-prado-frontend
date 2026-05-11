import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Publish = () => {
    const [formData, setFormData] = useState({
        tipoDePropiedad: '',
        otroTipoDePropiedad: '',
        titulo: '',
        descripcion: '',
        tipoDeOperacion: 'Venta',
        precio: '',
        recamaras: 0,
        baños: 0,
        mediosBaños: 0,
        construccion: 0,
        terreno: 0,
        estado: 'Yucatán',
        ciudad: 'Mérida',
        colonia: ''
    });

    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.warn('Debes iniciar sesión para publicar');
            navigate('/login');
        }
    }, [user, navigate]);

    const { 
        tipoDePropiedad, otroTipoDePropiedad, titulo, descripcion, tipoDeOperacion, 
        precio, recamaras, baños, mediosBaños, construccion, terreno, estado, ciudad, colonia 
    } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onFileChange = (e) => {
        if (e.target.files.length > 50) {
            toast.error('No puedes subir más de 50 archivos');
            e.target.value = null; // Resetea el input
            return;
        }
        setImagenes(e.target.files);
    };

    const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Verificación de seguridad antes de mover un dedo
    if (!user || !user.token) {
        console.error("ERROR: El objeto user no tiene token:", user);
        toast.error('Tu sesión no es válida. Por favor, cierra sesión y vuelve a entrar.');
        return;
    }

    setLoading(true);

    const data = new FormData();
    
    // Append de todos los campos
    data.append('tipoDePropiedad', tipoDePropiedad);
    if (tipoDePropiedad === 'Otro') {
        data.append('otroTipoDePropiedad', otroTipoDePropiedad);
    }
    data.append('titulo', titulo);
    data.append('descripcion', descripcion);
    data.append('tipoDeOperacion', tipoDeOperacion);
    data.append('precio', precio);
    data.append('recamaras', recamaras);
    data.append('banos', baños);
    data.append('mediosBanos', mediosBaños);
    data.append('construccion', construccion);
    data.append('terreno', terreno);
    data.append('estado', estado);
    data.append('ciudad', ciudad);
    data.append('colonia', colonia);

    for (let i = 0; i < imagenes.length; i++) {
        data.append('multimedia', imagenes[i]);
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`, // <--- Aquí ya no será undefined
            },
        };

        // Enviamos a Render
        await axios.post('https://inmobiliaria-prado-backend.onrender.com/api/publicaciones', data, config);
        
        toast.success('¡Propiedad en ' + colonia + ' publicada!');
        navigate('/');
    } catch (error) {
        console.error("Error completo en el post:", error.response?.data);
        const mensaje = error.response?.data?.message || 'Error al publicar';
        toast.error(mensaje);
    } finally {
        setLoading(false);
    }
};

    return (
        <section className="container my-5">
            <h2 className="mb-4 text-center">Registrar Nueva Propiedad</h2>
            <div className="card shadow-lg p-4 border-0">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        {/* Título */}
                        <div className="col-12 mb-3">
                            <label className="form-label fw-bold">Título de la publicación (Máx 150 carácteres) *</label>
                            <input type="text" className="form-control" name="titulo" value={titulo} onChange={onChange} required maxLength="150" />
                        </div>

                        {/* Tipo de Propiedad */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Tipo de Propiedad *</label>
                            <select className="form-select" name="tipoDePropiedad" value={tipoDePropiedad} onChange={onChange} required>
                                <option value="">Selecciona una opción</option>
                                <option value="Casa">Casa</option>
                                <option value="Casa en Condominio">Casa en Condominio</option>
                                <option value="Departamento">Departamento</option>
                                <option value="Terreno">Terreno</option>
                                <option value="Bodega">Bodega</option>
                                <option value="Local">Local</option>
                                <option value="Oficina">Oficina</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        {tipoDePropiedad === 'Otro' && (
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Especifica el tipo *</label>
                                <input type="text" className="form-control" name="otroTipoDePropiedad" value={otroTipoDePropiedad} onChange={onChange} required />
                            </div>
                        )}

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Operación *</label>
                            <select className="form-select" name="tipoDeOperacion" value={tipoDeOperacion} onChange={onChange} required>
                                <option value="Venta">Venta</option>
                                <option value="Renta">Renta</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Precio (MXN) *</label>
                            <input type="number" className="form-control" name="precio" value={precio} onChange={onChange} required />
                        </div>

                        {/* Detalles Numéricos */}
                        <div className="col-md-4 col-6 mb-3">
                            <label className="form-label">Recámaras</label>
                            <input type="number" className="form-control" name="recamaras" value={recamaras} onChange={onChange} min="0" />
                        </div>
                        <div className="col-md-4 col-6 mb-3">
                            <label className="form-label">Baños completos</label>
                            <input type="number" className="form-control" name="banos" value={banos} onChange={onChange} min="0" />
                        </div>
                        <div className="col-md-4 col-12 mb-3">
                            <label className="form-label">Medios Baños</label>
                            <input type="number" className="form-control" name="mediosBanos" value={mediosBanos} onChange={onChange} min="0" />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">M2 Construcción</label>
                            <input type="number" className="form-control" name="construccion" value={construccion} onChange={onChange} min="0" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">M2 Terreno</label>
                            <input type="number" className="form-control" name="terreno" value={terreno} onChange={onChange} min="0" />
                        </div>

                        {/* Ubicación */}
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Estado *</label>
                            <input type="text" className="form-control" name="estado" value={estado} onChange={onChange} required maxLength="100" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Ciudad *</label>
                            <input type="text" className="form-control" name="ciudad" value={ciudad} onChange={onChange} required maxLength="100" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Colonia *</label>
                            <input type="text" className="form-control" name="colonia" value={colonia} onChange={onChange} required maxLength="100" />
                        </div>

                        <div className="col-12 mb-3">
                            <label className="form-label fw-bold">Descripción (Máx 10,000 carácteres) *</label>
                            <textarea className="form-control" name="descripcion" rows="5" value={descripcion} onChange={onChange} required maxLength="10000"></textarea>
                        </div>

                        <div className="col-12 mb-4">
                            <label className="form-label fw-bold">Multimedia (Máx 50 imágenes) *</label>
                            <input type="file" className="form-control" name="multimedia" multiple accept="image/*" onChange={onFileChange} required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fs-5" disabled={loading}>
                        {loading ? (
                            <><span className="spinner-border spinner-border-sm me-2"></span> Subiendo a Cloudinary...</>
                        ) : 'Publicar Propiedad'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Publish;