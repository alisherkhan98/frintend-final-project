import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  footprintDetails: undefined,
  isFetchingFootprint: false,
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
  },
});

export const { setFlightDetails, setIsFetchingFootprint } =
  flightDataSlice.actions;

export default flightDataSlice.reducer;
