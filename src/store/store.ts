import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

export const rootReducer = combineSlices(
  userSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
