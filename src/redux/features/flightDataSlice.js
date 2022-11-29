import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  footprintDetails: undefined,
  isFetchingFootprint: false,
  fetchError: {},
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
      state.fetchError.message = action.payload.message;
      state.fetchError.status = action.payload.status;
    },
  },
});

export const { setFlightDetails, setIsFetchingFootprint, setError } =
  flightDataSlice.actions;

export default flightDataSlice.reducer;
