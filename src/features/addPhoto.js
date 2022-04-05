import { createSlice } from '@reduxjs/toolkit';

export const addPhoto = createSlice({
  name: 'addPhoto',
  initialState: {
    showModal: false,
    photoToBeUpdated: '',
  },
  reducers: {
    showModal: (state, action) => {
      state.addPhoto = action.payload;
    },
  },
});

export const { showModal } = addPhoto.actions;
export const selectAddPhoto = (state) => state.addPhoto;
export default addPhoto.reducer;

// import { showModal } from '../features/addPhoto';

// const dispatch = useDispatch();

// dispatch(showModal());

// const addPhoto = useSelector(selectAddPhoto); true / false
