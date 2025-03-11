import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentEmail: string;
};

// initial state for user
// in this particular case user's email
const initialState: UserState = {
  currentEmail: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.currentEmail = action.payload;
    },
  },
});

export const { setEmail } = userSlice.actions;