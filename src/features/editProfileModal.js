import { createSlice } from '@reduxjs/toolkit';

export const editProfileModal = createSlice({
  name: 'editProfileModal',
  initialState: {
    editProfileModal: false,
  },
  reducers: {
    toggleEditProfileModal: (state, action) => {
      state.editProfileModal = action.payload;
    },
  },
});

export const { toggleEditProfileModal } = editProfileModal.actions;
export const selectEditProfileModal = (state) =>
  state.editProfileModal.editProfileModal;
export default editProfileModal.reducer;

// import { toggleDisableScreen } from '../features/disableScreen';

// const dispatch = useDispatch();

//dispatch(toggleDisableScreen());

// const disableScreen = useSelector(selectDisableScreen); true / false
