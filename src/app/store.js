import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import disableScreenReducer from '../features/disableScreen';
import addPhotoReducer from '../features/addPhoto';
import createPostReducer from '../features/createPost';
import postReducer from '../features/posts';
import editProfileModalReducer from '../features/editProfileModal';

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    posts: postReducer,
    disableScreen: disableScreenReducer,
    addPhoto: addPhotoReducer,
    createPost: createPostReducer,
    updatePosts: postReducer,
    editProfileModal: editProfileModalReducer,
  },
});
