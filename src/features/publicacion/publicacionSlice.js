import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import publicacionService from './publicacionService'

const initialState = {
    publicaciones: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Crear publicación
export const crearPublicacion = createAsyncThunk('publicaciones/crear', async (publicacionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await publicacionService.crearPublicacion(publicacionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const publicacionSlice = createSlice({
    name: 'publicacion',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(crearPublicacion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(crearPublicacion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.publicaciones.push(action.payload)
            })
            .addCase(crearPublicacion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = publicacionSlice.actions
export default publicacionSlice.reducer