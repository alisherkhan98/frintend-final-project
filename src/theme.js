import React from "react";
// MUI
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

function Theme({ children, isDarkMode }) {
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
        main: isDarkMode ? "#21ab7d" : "#156d4f",
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
  theme.components.MuiCard.styleOverrides.root.boxShadow = theme.shadows[7];
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
