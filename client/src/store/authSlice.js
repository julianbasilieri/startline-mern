import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginAsync = createAsyncThunk('auth/loginAsync', async (credentials) => {
    const prom = axios.post('http://localhost:4000/api/auth/login', credentials)
    const { data } = await toast.promise(prom, {
        loading: 'Verificando',
        success: (res) => `${res.data.message}`,
        error: (err) => `${err.response.data.message}`,
    });

    console.log(data)
    return data
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer