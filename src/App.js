// react
import React, { useEffect, useState } from "react";
// MUI
import { Box, useMediaQuery } from "@mui/material";
// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import Theme from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import MyAlert from "./components/MyAlert";
// screens
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ShopScreen from "./screens/ShopScreen";
import CartScreen from "./screens/CartScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SuccessScreen from "./screens/SuccessScreen";

// custom hooks
import useAuthenticate from "./custom-hooks/useAuthenticate";
import { useSelector } from "react-redux";
import useUpdateCart from "./custom-hooks/useUpdateCart";

function App() {
  // dark mode
  const initialMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(initialMode);

  // loading
  const [isLoading, setIsLoading] = useState(true);

  // alert
  const [alertMessage, setAlertMessage] = useState("");

  // user
  const { user } = useSelector((state) => state.auth);

  // everytime the there's a change in the authentication, redux reducers are dispatched to sign in or sign out
  useAuthenticate(setIsLoading, setAlertMessage);

  // update cart on firestore when changes locally
  useUpdateCart(user, setAlertMessage);

  return (
    <Theme isDarkMode={isDarkMode}>
      <Router>
        {/* loading */}
        {isLoading && <LoadingScreen />}
        {/* alert in case of error */}
        {alertMessage && (
          <Box
            sx={{
              position: "fixed",
              top: 100,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              zIndex: 9999,
            }}
          >
            <MyAlert severity="error">{alertMessage}</MyAlert>
          </Box>
        )}
        <ScrollToTop />
        <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <SignInScreen />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpScreen />}
          />
          <Route path="/shop" element={<ShopScreen />} />
          <Route
            path="/cart"
            element={
              !user && !isLoading ? <Navigate to="/signin" /> : <CartScreen />
            }
          />
          <Route path="/success" element={!isLoading && <SuccessScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
