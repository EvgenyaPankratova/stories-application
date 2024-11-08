import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'cardIsOpen',
  initialState: {
    cardIsOpen: false,
  },
  reducers: {
    openCard(state, action) {
        state.cardIsOpen = action.payload;
    },
  },
});

export const {openCard} = cardSlice.actions;

export default cardSlice.reducer;
