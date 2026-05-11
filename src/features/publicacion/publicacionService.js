import axios from 'axios'

const API_URL = 'https://inmobiliaria-prado-backend.onrender.com/api/publicaciones/'

// Crear una nueva publicación
const crearPublicacion = async (publicacionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // Nota: No forzamos Content-Type aquí, 
            // dejamos que el FormData lo haga automáticamente
        }
    }
    const response = await axios.post(API_URL, publicacionData, config)
    return response.data
}

const publicacionService = {
    crearPublicacion
}

export default publicacionService