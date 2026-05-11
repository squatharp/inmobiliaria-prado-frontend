import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import publicacionReducer from '../features/publicacion/publicacionSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        publicacion: publicacionReducer,
    }
})