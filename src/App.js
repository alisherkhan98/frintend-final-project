// react
import React, { useState } from "react";
// MUI
import { Box } from "@mui/material";
// router
import { RouterProvider } from "react-router-dom";
import router from "./browser-router/router";
// components
import Theme from "./theme";
import MyAlert from "./components/MyAlert";
// screens
import LoadingScreen from "./screens/LoadingScreen";
// custom hooks
import useAuthenticate from "./custom-hooks/useAuthenticate";
import { useSelector } from "react-redux";
import useUpdateCart from "./custom-hooks/useUpdateCart";

function App() {
  // loading
  const { isLoading } = useSelector((state) => state.loading);

  // alert
  const [alertMessage, setAlertMessage] = useState("");

  // user
  const { user } = useSelector((state) => state.auth);

  // everytime the there's a change in the authentication, redux reducers are dispatched to sign in or sign out
  useAuthenticate(setAlertMessage);

  // update cart on firestore when changes locally
  useUpdateCart(user, setAlertMessage);

  return (
    <Theme>
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

      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
