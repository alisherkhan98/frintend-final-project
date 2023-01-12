import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  isLoading: true,
};
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
