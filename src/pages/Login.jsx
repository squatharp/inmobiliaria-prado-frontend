import { useState, useEffect } from "react"
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '' // Mantenemos el estado local como password por comodidad
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)

    useEffect(()=> {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess || user) {
        navigate('/')
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
      
      // IMPORTANTE: Mapeamos password a contrasena para tu backend
      const userData = {
        email,
        contrasena: password 
      }

      dispatch(login(userData))
    }

    if (isLoading) {
      return <Spinner />
    }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {/* Definimos que en pantallas grandes ocupe 4 columnas y esté centrado */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 p-4 rounded-3">
            
            <section className="heading text-center mb-4">
              <h4 className="fw-bold text-uppercase">
                <FaSignInAlt className="me-2" /> Login
              </h4>
              <p className="text-muted small">Por favor accede a tu cuenta</p>
            </section>

            <section className="form">
              <form onSubmit={onSubmit}>
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
                
                <div className="form-group mb-4">
                  <label className="form-label small fw-bold">PASSWORD</label>
                  <input 
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Tu contraseña"
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-dark w-100 py-2 fw-bold shadow-sm">
                    ENTRAR
                  </button>
                </div>
              </form>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;