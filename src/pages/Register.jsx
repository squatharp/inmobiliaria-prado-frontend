import { useState, useEffect } from "react"
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const Register = () => {

    const [formData, setFormData] = useState({
      nombre: '',
      email: '',
      password: '',
      password2: ''
    })

    const { nombre, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)

    useEffect(()=> {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess) {
        navigate('/login')
      }

      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
      }))
    }

    const onSubmit = (e) => {
      e.preventDefault()

      if (password !== password2) {
        toast.error('Las contraseñas no coinciden')
      } else {
        const userData = {
          nombre, 
          email, 
          contrasena : password // Sincronizado con tu Backend
        }
        dispatch(register(userData))
      }
    }

    if (isLoading) {
      return <Spinner />
    }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {/* Ajustamos el ancho para que el formulario de registro se vea equilibrado */}
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 p-4 rounded-3">
            
            <section className="heading text-center mb-4">
              <h4 className="fw-bold text-uppercase">
                <FaUser className="me-2" /> Registrarse
              </h4>
              <p className="text-muted small">Crea una cuenta para gestionar tus publicaciones</p>
            </section>

            <section className="form">
              <form onSubmit={onSubmit}>
                
                <div className="form-group mb-3">
                  <label className="form-label small fw-bold">NOMBRE COMPLETO</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    placeholder="Escribe tu nombre"
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label small fw-bold">EMAIL</label>
                  <input 
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Tu correo electrónico"
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label small fw-bold">PASSWORD</label>
                      <input 
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Contraseña"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label small fw-bold">CONFIRMAR</label>
                      <input 
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={password2}
                        placeholder="Repite password"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-dark w-100 py-2 fw-bold shadow-sm">
                    CREAR CUENTA
                  </button>
                </div>

                <div className="text-center mt-3">
                  <p className="small text-muted">
                    ¿Ya tienes cuenta? <a href="/login" className="text-dark fw-bold text-decoration-none">Inicia sesión</a>
                  </p>
                </div>

              </form>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;