import { configureStore } from "@reduxjs/toolkit";
import flightDataReducer from "./features/flightDataSlice";
import authReducer from "./features/authSlice";
import shopReducer from "./features/shopSlice";
import loadingReducer from "./features/loadingSlice";
import darkModeReducer from "./features/darkModeSlice";

export const store = configureStore({
  reducer: {
    flightData: flightDataReducer,
    auth: authReducer,
    shop: shopReducer,
    loading: loadingReducer,
    darkMode: darkModeReducer,
  },
});
