import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastProm } from "../utils/toastProm";
import { handleToast } from "../utils/toast";
export const loginAsync = createAsyncThunk('auth/loginAsync', async (credentials) => {
    try {
        const prom = axios.post('/api/auth/login', credentials)
        const { data } = await toastProm(prom)

        return data
    } catch (error) {
        return error.response.data;
    }
})

export const singUpAsync = createAsyncThunk('auth/singUpAsync', async (credentials) => {
    try {
        const prom = await axios.post('/api/auth/signup', credentials)
        const { data } = await toastProm(prom)

        return data
    } catch (error) {
        return error.response;
    }
})

export const updateUserAsync = createAsyncThunk('auth/updateUserAsync', async (user) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.put(`/api/users`, user,
            {
                headers: {
                    Authorization: token
                }
            })
        handleToast(data)

        return data
    } catch (error) {
        return error.response.data;
    }
})

export const isAdminAsync = createAsyncThunk('auth/isAdminAsync', async () => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('/api/auth/check-rol', {
            headers: {
                Authorization: token
            }
        })

        return data
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
})

export const checkTokenAsync = createAsyncThunk('auth/checkTokenAsync', async () => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('/api/auth/check-token', {
            headers: {
                Authorization: token
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAdmin: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAdmin = null
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload.userData
            localStorage.setItem('token', action.payload.token)
        })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.user = action.payload.usuarioActualizado
            })
            .addCase(isAdminAsync.fulfilled, (state, action) => {
                console.log('action', action.payload)
                state.isAdmin = action.payload.success
            })
            .addCase(checkTokenAsync.fulfilled, (state, action) => {
                console.log('che-to', action.payload)
                state.user = action.payload.userData
            })
    }

})

export const { logout } = authSlice.actions
export default authSlice.reducer