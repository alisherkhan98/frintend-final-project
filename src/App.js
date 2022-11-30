// react
import React from "react";
// components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import DidYouKnow from "./components/DidYouKnow";
import MyAlert from "./components/MyAlert";
import Footer from "./components/Footer";
// redux
import { useSelector } from "react-redux";
import ResultCards from "./components/ResultCards";
// MUI
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { footprintDetails, isFetchingFootprint, footprintError } = useSelector(
    (state) => state.flightData
  );
  console.log(footprintError);

  let theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#20c58e" : "#156d4f",
      },
      secondary: {
        main: isDarkMode ? "#21ab7d69" : "#429a2f1a",
      },
      neutral: {
        main: isDarkMode ? "#2b2b2b" : "#f7f7f7",
      },
      hero: {
        main: "#f7f7f7",
      },
      icons: {
        main: isDarkMode ? "#f7f7f7" : "#565656",
      },
      text: {
        contrast: isDarkMode ? "#000000" : "#f7f7f7",
      },
      background: {
        section: isDarkMode ? "#0c402f" : "#156d4f",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "2rem",
            width: "fit-content",
            textTransform: "unset",
            fontSize: "1rem",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            height: "100%",
            padding: "1rem",

            boxSizing: "border-box",
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            boxSizing: "border-box",
          },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  theme.components.MuiCard.styleOverrides.root.boxShadow = theme.shadows[5];

  return (
    <ThemeProvider theme={theme}>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Hero />
      <Calculator />
      {/* alert for errors */}
      {footprintError && !footprintDetails && (
        <MyAlert
          text={
            "Error code: " +
            footprintError.status +
            ". " +
            footprintError.message
          }
          severity="error"
        />
      )}
      {footprintDetails && !isFetchingFootprint && <ResultCards />}
      <DidYouKnow />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
