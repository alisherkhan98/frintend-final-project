// react
import React from "react";
import { createRoot } from "react-dom/client";
// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
// css
import "./index.css";

// components
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
