import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cardSlice';
export default configureStore({
  reducer: {
    cardIsOpen: cardReducer,
  },
});
