import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';
import disableScreenReducer from '../features/disableScreen';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    disableScreen: disableScreenReducer,
  },
});
