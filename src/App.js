// react
import React, { useEffect, useState } from "react";
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
import LoadingScreen from "./screens/LoadingScreen";
// redux
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "./redux/features/authSlice";
import { clearCart, setInitialCart } from "./redux/features/shopSlice";
// firebase
import { auth, db } from "./firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  // dark mode
  const initialMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(initialMode);

  // loading
  const [isLoading, setIsLoading] = useState(true);

  // user
  const { user } = useSelector((state) => state.auth);

  // cart
  const { cart } = useSelector((state) => state.shop);

  // listener for any change in the auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        dispatch(signIn({ email: newUser.email, uid: newUser.uid }));
        getDoc(doc(db, "users", newUser.uid))
          .then((docsnap) => {
            dispatch(setInitialCart(docsnap.data().cart));
          })
          .catch((error) =>
            console.log(
              "There was an error retrieving the data from firestore",
              error
            )
          );
      } else {
        dispatch(clearCart());
        dispatch(signOut());
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // update cart on firestore when changes locally
  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          cart: cart,
        },
        { merge: true }
      ).catch((error) => {
        console.log(error);
      });
    }
  }, [cart]);

  return (
    <Theme isDarkMode={isDarkMode}>
      <Router>
        {isLoading && <LoadingScreen />}
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
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
