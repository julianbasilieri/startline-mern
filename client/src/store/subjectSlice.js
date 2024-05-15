import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleToast } from "../utils/toast";

export const getSubjectsAsync = createAsyncThunk('subjects/getSubjectsAsync', async () => {
    try {
        const { data } = await axios.get('http://localhost:4000/api/subjects')

        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const postSubjectsAsync = createAsyncThunk('subjects/postSubjectsAsync', async (subject) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.post('http://localhost:4000/api/subjects', subject, {
            headers: {
                Authorization: token
            }
        })
        handleToast(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const updateSubjectsAsync = createAsyncThunk('subjects/updateSubjectsAsync', async ({ subjectId, subject }) => {
    try {
        console.log('subject', subject)
        const token = localStorage.getItem('token')
        const { data } = await axios.put(`http://localhost:4000/api/subjects/${subjectId}`, subject, {
            headers: {
                Authorization: token
            }
        })
        handleToast(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const deleteSubjectsAsync = createAsyncThunk('subjects/deleteSubjectsAsync', async (subjectId) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.delete(`http://localhost:4000/api/subjects/${subjectId}`, {
            headers: {
                Authorization: token
            }
        })
        handleToast(data)
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
            .addCase(postSubjectsAsync.fulfilled, (state, action) => {
                if (action.payload.success) state.subjects.push(action.payload.subjectGuardado)
            })
            .addCase(updateSubjectsAsync.fulfilled, (state, action) => {
                console.log('action', action.payload)
                if (action.payload.success) {
                    const updatedSubjectIndex = state.subjects.findIndex(subject => subject._id === action.payload.subjectActualizada._id)
                    if (updatedSubjectIndex !== -1) {
                        state.subjects[updatedSubjectIndex] = action.payload.subject
                    }
                }
            })
            .addCase(deleteSubjectsAsync.fulfilled, (state, action) => {
                console.log('action', action.payload.subject)
                const index = state.subjects.findIndex(subject => subject._id === action.payload.subject._id)
                state.subjects.splice(index, 1)
            })
    }
})

export default subjectSlice.reducer