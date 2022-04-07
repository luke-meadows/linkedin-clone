import { createSlice } from '@reduxjs/toolkit';

export const createPost = createSlice({
  name: 'createPost',
  initialState: {
    createPost: false,
  },
  reducers: {
    toggleCreatePost: (state, action) => {
      state.createPost = action.payload;
    },
  },
});

export const { toggleCreatePost } = createPost.actions;
export const selectCreatePost = (state) => state.createPost.createPost;
export default createPost.reducer;

// import { toggleCreatePost } from '../features/createPost';

// const dispatch = useDispatch();

//dispatch(toggleCreatePost());

// const toggleCreatePost = useSelector(selectCreatePost); true / false
