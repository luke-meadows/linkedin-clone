import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import disableScreenReducer from '../features/disableScreen';
import addPhotoReducer from '../features/addPhoto';
import createPostReducer from '../features/createPost';
import postReducer from '../features/posts';

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    post: postReducer,
    disableScreen: disableScreenReducer,
    addPhoto: addPhotoReducer,
    createPost: createPostReducer,
    updatePosts: postReducer,
  },
});
