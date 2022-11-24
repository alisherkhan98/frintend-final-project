import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  footprintDetails: {},
};
export const flightDataSlice = createSlice({
  name: "flightData",
  initialState,
  reducers: {
    setFlightDetails: (state, action) => {
      state.footprintDetails = action.payload;
    },
  },
});

export const { setFlightDetails } = flightDataSlice.actions;

export default flightDataSlice.reducer;
