import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastProm } from "../utils/toastProm";

const token = localStorage.getItem('token')

export const loginAsync = createAsyncThunk('auth/loginAsync', async (credentials) => {
    try {
        const prom = axios.post('http://localhost:4000/api/auth/login', credentials)
        const { data } = await toastProm(prom)

        return data
    } catch (error) {
        return error.response.data;
    }
})

export const updateUserAsync = createAsyncThunk('auth/updateUserAsync', async (user) => {
    try {
        const { data } = await axios.put(`http://localhost:4000/api/users`, user,
            {
                headers: {
                    Authorization: token
                }
            })
        console.log('dataupdate', data)

        return data
    } catch (error) {
        return error.response.data;
    }
})

export const isAdminAsync = createAsyncThunk('auth/isAdminAsync', async () => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('http://localhost:4000/api/auth/check-rol', {
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
        const { data } = await axios.get('http://localhost:4000/api/auth/check-token', {
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
        forcedLogin: (state, action) => {
            state.user = action.payload
        }
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
                state.isAdmin = action.payload.success
                console.log('isAdmin', state.isAdmin)
            })
    }

})

export const { logout, forcedLogin } = authSlice.actions
export default authSlice.reducer