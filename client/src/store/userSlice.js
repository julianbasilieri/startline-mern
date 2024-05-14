import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserAsync = createAsyncThunk('user/getUserAsync', async (username) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/users?username=${username}`)
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const getUserByUsernameAsync = createAsyncThunk('user/getUserByUsernameAsync', async (username) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/users?username=${username}`)
        return data;
    } catch (error) {
        return error.response.data;
    }
})

const userSlice = createSlice({
    name: "subject",
    initialState: {
        userComplete: null
    },
    reducers: {
        deleteUser: (state) => {
            state.userComplete = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            state.userComplete = action.payload.usuarios[0]
        })
    }
})
export const { deleteUser } = userSlice.actions
export default userSlice.reducer