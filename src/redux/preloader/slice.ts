import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false as boolean
};

const preloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setLoading } = preloaderSlice.actions;
export default preloaderSlice.reducer;
