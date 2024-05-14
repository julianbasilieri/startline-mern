import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const addImageAsync = createAsyncThunk('image/addImageAsync', async (formData) => {
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dy30jccdy/image/upload', formData);       
        return response;
    } catch (error) {
        return error.response.data;
    }
});

const imageSlice = createSlice({
    name: "image",
    initialState: null,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['image/addImageAsync/fulfilled'],
            },
        }),
    extraReducers: (builder) => {
        builder.addCase(addImageAsync.fulfilled, () => {
            toast.success('Imagen subida exitosamente')
        })
    }
})

export default imageSlice.reducer