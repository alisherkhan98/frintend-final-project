import { configureStore } from "@reduxjs/toolkit";
import flightDataReducer from "./features/flightDataSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    flightData: flightDataReducer,
    auth: authReducer,
  },
});
