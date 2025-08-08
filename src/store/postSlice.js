import { createSlice } from "@reduxjs/toolkit";

// Think of this as the initial box where we store all our post-related data
const initialState = {
    // List of all blog posts
    posts: [],
    // Are we loading data? (true/false)
    loading: false,
    // Any error message if something goes wrong
    error: null,
    // The post we're currently viewing/editing
    currentPost: null
}

// This is our post manager (slice) that handles all post-related actions
const postSlice = createSlice({
    name: "post", // Just a name to identify this slice
    initialState, // Our initial data from above

    // These are all the actions we can do with our posts
    reducers: {
        // When we get posts from the server, save them here
        setPosts: (state, action) => {
            state.posts = action.payload; // Save the posts
            state.loading = false;        // We're done loading
            state.error = null;           // Clear any errors
        },

        // Show/hide loading spinner
        setLoading: (state, action) => {
            state.loading = action.payload; // true = show loading, false = hide loading
        },

        // If something goes wrong, save the error message
        setError: (state, action) => {
            state.error = action.payload;  // Save error message
            state.loading = false;         // Stop loading
        },

        // When viewing a single post, save it here
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
        },

        // When creating a new post
        addPost: (state, action) => {
            state.posts.push(action.payload); // Add new post to our list
        },

        // When editing a post
        updatePost: (state, action) => {
            // Find the post we want to update
            const index = state.posts.findIndex(post => post.$id === action.payload.$id);
            if (index !== -1) {
                // Replace the old post with the updated one
                state.posts[index] = action.payload;
            }
        },

        // When deleting a post
        deletePost: (state, action) => {
            // Remove the post with the given ID
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        },

        // Reset everything back to initial state
        clearPosts: (state) => {
            state.posts = [];
            state.currentPost = null;
            state.error = null;
            state.loading = false;
        }
    }
});

// Export all our actions so we can use them in our components
export const {
    setPosts,      // Save all posts
    setLoading,    // Show/hide loading
    setError,      // Save error message
    setCurrentPost, // Save current post
    addPost,       // Create new post
    updatePost,    // Edit post
    deletePost,    // Delete post
    clearPosts     // Reset everything
} = postSlice.actions;

// Export the reducer for our store
export default postSlice.reducer;
