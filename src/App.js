// react
import React from "react";
// MUI
import { useMediaQuery } from "@mui/material";
// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import Theme from "./theme";
// screens
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

function App() {
  const initialMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = React.useState(initialMode);

  return (
    <Theme isDarkMode={isDarkMode}>
      <Router>
        <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
