import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const strore = configureStore({
    reducer: { auth: authReducer }
})