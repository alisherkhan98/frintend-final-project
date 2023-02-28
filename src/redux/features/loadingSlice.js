import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  isLoading: true,
  areImagesLoaded: false,
};
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAreImagesLoaded: (state, action) => {
      state.areImagesLoaded = action.payload;
    },
  },
});

export const { setIsLoading, setAreImagesLoaded } = loadingSlice.actions;

export default loadingSlice.reducer;
