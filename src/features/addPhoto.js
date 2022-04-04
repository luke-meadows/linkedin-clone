import { createSlice } from '@reduxjs/toolkit';

export const addPhoto = createSlice({
  name: 'addPhoto',
  initialState: {
    addPhoto: false,
  },
  reducers: {
    toggleAddPhoto: (state, action) => {
      state.addPhoto = action.payload;
    },
  },
});

export const { toggleAddPhoto } = addPhoto.actions;
export const selectAddPhoto = (state) => state.addPhoto.addPhoto;
export default addPhoto.reducer;

// import { toggleAddPhoto } from '../features/addPhoto';

// const dispatch = useDispatch();

//dispatch(toggleAddPhoto());

// const addPhoto = useSelector(selectAddPhoto); true / false
