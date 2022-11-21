// react
import React from "react";
import { createRoot } from "react-dom/client";
// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
// css
import "./index.css";
// MUI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
// components
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);
