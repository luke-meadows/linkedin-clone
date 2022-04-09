import { createSlice } from '@reduxjs/toolkit';

export const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: 'hello',
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = posts.actions;
export const selectAllPosts = (state) => state.posts;
export default posts.reducer;
