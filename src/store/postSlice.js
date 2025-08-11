import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    currentPost: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
        },

        addPost: (state, action) => {
            state.posts.push(action.payload);
        },

        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload.$id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },

        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        },

        clearPosts: (state) => {
            state.posts = [];
            state.currentPost = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const {
    setPosts,
    setLoading,
    setError,
    setCurrentPost,
    addPost,
    updatePost,
    deletePost,
    clearPosts
} = postSlice.actions;

export default postSlice.reducer;
