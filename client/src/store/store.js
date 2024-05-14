import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postReducer from './postSlice'
import subjectReducer from './subjectSlice'
import imageReducer from './imageSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        subject: subjectReducer,
        image: imageReducer,
        user: userReducer
    }
})