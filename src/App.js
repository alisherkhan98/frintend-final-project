// react
import React, { useState } from "react";
// router
import { RouterProvider } from "react-router-dom";
import router from "./browser-router/router";
// components
import Theme from "./theme";
import FixedAlert from "./atoms/FixedAlert";
// screens
import LoadingScreen from "./screens/LoadingScreen";
// custom hooks
import useAuthenticate from "./custom-hooks/useAuthenticate";
import { useSelector } from "react-redux";
import useUpdateCart from "./custom-hooks/useUpdateCart";
import usePreloadImages from "./custom-hooks/usePreloadImages";
// imgs
import hero from "./assets/img/hero.jpg";
import hero2 from "./assets/img/hero2.jpg";

function App() {
  // loading
  const { isLoading } = useSelector((state) => state.loading);
  const { imagesPreloaded } = usePreloadImages([hero, hero2]);
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
      {isLoading || !imagesPreloaded ? (
        <LoadingScreen />
      ) : (
        <RouterProvider router={router} />
      )}

      {/* alert in case of error */}
      {alertMessage && <FixedAlert>{alertMessage}</FixedAlert>}
    </Theme>
  );
}

export default App;
