import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: 'initial',
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    changeProfileImg: (state, action) => {
      state.user.profilePic = action.payload;
    },
  },
});

export const { login, logout, changeProfileImg } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
