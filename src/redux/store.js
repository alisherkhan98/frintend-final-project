import { configureStore } from "@reduxjs/toolkit";
import flightDataReducer from "./features/flightDataSlice";
import authReducer from "./features/authSlice";
import shopReducer from "./features/shopSlice";

export const store = configureStore({
  reducer: {
    flightData: flightDataReducer,
    auth: authReducer,
    shop: shopReducer,
  },
});
