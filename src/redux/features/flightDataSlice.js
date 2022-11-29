import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  footprintDetails: undefined,
  isFetchingFootprint: false,
  footprintError: undefined,
};
export const flightDataSlice = createSlice({
  name: "flightData",
  initialState,
  reducers: {
    setFlightDetails: (state, action) => {
      state.footprintDetails = action.payload;
    },
    setIsFetchingFootprint: (state, action) => {
      state.isFetchingFootprint = action.payload;
    },
    setError: (state, action) => {
      state.footprintError = action.payload;
    },
    removeError: (state) => {
      state.footprintError = undefined;
    },
  },
});

export const {
  setFlightDetails,
  setIsFetchingFootprint,
  setError,
  removeError,
} = flightDataSlice.actions;

export default flightDataSlice.reducer;
