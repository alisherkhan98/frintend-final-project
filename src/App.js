// react
import React, { useEffect } from "react";
// MUI
import { useMediaQuery } from "@mui/material";
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
// screens
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ShopScreen from "./screens/ShopScreen";
import CartScreen from "./screens/CartScreen";
// redux
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "./redux/features/authSlice";
// firebase
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  // dark mode
  const initialMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = React.useState(initialMode);

  // user
  const { user } = useSelector((state) => state.auth);

  // listener for anh change in the auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        dispatch(signIn(newUser));
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Theme isDarkMode={isDarkMode}>
      <Router>
        <ScrollToTop />
        <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route
            path="/cart"
            element={user ? <CartScreen /> : <Navigate to="/signin" />}
          />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
