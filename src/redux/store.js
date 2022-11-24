import { configureStore } from "@reduxjs/toolkit";
import flightDataReducer from "./features/flightDataSlice";
export const store = configureStore({
  reducer: {
    flightData: flightDataReducer,
  },
});
