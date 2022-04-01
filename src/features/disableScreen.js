import { createSlice } from '@reduxjs/toolkit';

export const disableScreen = createSlice({
  name: 'disableScreen',
  initialState: {
    disableScreen: false,
  },
  reducers: {
    toggleDisableScreen: (state, action) => {
      state.disableScreen = action.payload;
    },
  },
});

export const { toggleDisableScreen } = disableScreen.actions;
export const selectDisableScreen = (state) => state.disableScreen.disableScreen;
export default disableScreen.reducer;

// import { toggleDisableScreen } from '../features/disableScreen';

// const dispatch = useDispatch();

//dispatch(toggleDisableScreen());

// const disableScreen = useSelector(selectDisableScreen); true / false
