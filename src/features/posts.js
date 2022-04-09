import { createSlice } from '@reduxjs/toolkit';

export const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    updatePosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { updatePosts } = posts.actions;
export const selectPosts = (state) => state.posts.posts;
export default posts.reducer;
