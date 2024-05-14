import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubjectsAsync = createAsyncThunk('subjects/getSubjectsAsync', async () => {
    try {
        const { data } = await axios.get('http://localhost:4000/api/subjects')

        return data;
    } catch (error) {
        return error.response.data;
    }
});

const subjectSlice = createSlice({
    name: "subject",
    initialState: {
        subjects: null
    },
    extraReducers: (builder) => {
        builder.addCase(getSubjectsAsync.fulfilled, (state, action) => {
            state.subjects = action.payload.subjects
        })
    }
})

export default subjectSlice.reducer