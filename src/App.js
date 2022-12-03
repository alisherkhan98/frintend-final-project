// react
import React, { useEffect } from "react";
// MUI
import { useMediaQuery } from "@mui/material";
// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import Theme from "./theme";
import ScrollToTop from "./components/scrollToTop";
// screens
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ShopScreen from "./screens/ShopScreen";
// redux
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/features/authSlice";
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
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("logged in");
        dispatch(login({ email: newUser.email }));
      } else {
        console.log("logged out");
        dispatch(logout());
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
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
