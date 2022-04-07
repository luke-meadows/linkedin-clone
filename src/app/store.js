import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';
import disableScreenReducer from '../features/disableScreen';
import addPhotoReducer from '../features/addPhoto';
import createPostReducer from '../features/createPost';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    disableScreen: disableScreenReducer,
    addPhoto: addPhotoReducer,
    createPost: createPostReducer,
  },
});
