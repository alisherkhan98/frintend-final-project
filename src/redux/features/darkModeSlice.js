import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  isDarkMode: false,
};
export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
