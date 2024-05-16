import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleToast } from "../utils/toast";

export const getPostAsync = createAsyncThunk('post/getPostAsync', async () => {
    try {
        const { data } = await axios.get('/api/posts')

        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const addPostAsync = createAsyncThunk('post/addPostAsync', async (post) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.post('/api/posts', post, {
            headers: {
                Authorization: token
            }
        })

        handleToast(data)

        return data;
    } catch (error) {
        return error.response.data;
    }
})


export const updatePostAsync = createAsyncThunk('post/updatePostAsync', async ({ postId, info }) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.put(`/api/posts/${postId}`, info, {
            headers: {
                Authorization: token
            }
        })

        handleToast(data)

        return data;
    } catch (error) {
        return error.response.data;
    }
})

export const deletePostAsync = createAsyncThunk('post/deletePostAsync', async (postId) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.delete(`/api/posts/${postId}`, {
            headers: {
                Authorization: token
            }
        })

        handleToast(data)

        return data;
    } catch (error) {
        return error.response.data;
    }
})

export const addCommentAsync = createAsyncThunk('post/addCommentAsync', async (comment) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.post('/api/comments', comment, {
            headers: {
                Authorization: token
            }
        })

        handleToast(data)

        return data;
    } catch (error) {
        return error.response.data;
    }
})


export const updateCommentAsync = createAsyncThunk('post/updateCommentAsync', async ({ commentId, comment }) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.put(`/api/comments/${commentId}`, comment, {
            headers: {
                Authorization: token
            }
        })

        handleToast(data)

        return data;
    } catch (error) {
        return error.response.data;
    }
})


export const deleteCommentAsync = createAsyncThunk('post/deleteCommentAsync', async (commentId) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.delete(`/api/comments/${commentId}`, {
            headers: {
                Authorization: token
            }
        })

        handleToast(data)

        return data;
    } catch (error) {
        return error.response.data;
    }
})

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: null
    },
    extraReducers: (builder) => {
        builder.addCase(getPostAsync.fulfilled, (state, action) => {
            if (action.payload.success) state.posts = action.payload.posts;
        })
            .addCase(addPostAsync.fulfilled, (state, action) => {
                if (action.payload.success) state.posts.push(action.payload.postGuardado);
            })
            .addCase(updatePostAsync.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const updatedPostIndex = state.posts.findIndex(post => post._id === action.payload.postActualizado._id);
                    if (updatedPostIndex !== -1) {
                        state.posts[updatedPostIndex] = action.payload.postActualizado;
                    }
                }
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.posts = state.posts.filter(post => post._id !== action.payload.post._id);
                }
            })
            .addCase(addCommentAsync.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const postId = action.payload.commentGuardado.post;
                    const postToUpdate = state.posts.find(post => post._id === postId);
                    if (postToUpdate) {
                        postToUpdate.comments.push(action.payload.commentGuardado);
                    }
                }
            })
            .addCase(updateCommentAsync.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const postId = action.payload.commentActualizado.post;
                    const postToUpdate = state.posts.find(post => post._id === postId);
                    if (postToUpdate) {
                        const commentToUpdate = postToUpdate.comments.find(comment => comment._id === action.payload.commentActualizado._id);
                        if (commentToUpdate) {
                            commentToUpdate.content = action.payload.commentActualizado.content;
                        }
                    }
                }
            })
            .addCase(deleteCommentAsync.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const postId = action.payload.comment.post;
                    const postToDelete = state.posts.find(post => post._id === postId);
                    if (postToDelete) {
                        postToDelete.comments = postToDelete.comments.filter(comment => comment._id !== action.payload.comment._id);
                    }
                }
            })
    }
});

export default postSlice.reducer