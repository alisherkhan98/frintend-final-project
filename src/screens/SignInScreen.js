import React, { useState } from "react";
// MUI
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Card,
} from "@mui/material";
// Router
import { Link } from "react-router-dom";

// images
import bg from "../assets/img/hero.jpg";
// components
import MyAlert from "../components/MyAlert";
// custom hooks
import useSignIn from "../custom-hooks/useSignIn";

const textFieldStyle = {
  width: 1,
  mb: 1,
};

function SignInScreen() {
  const theme = useTheme();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [signInError, setSignInError] = useState("");

  // custom hook to sign in
  useSignIn(credentials, isSigningIn, setIsSigningIn, setSignInError);
  //   function to make components controlled
  function handleChange(e) {
    const target = e.target;
    setCredentials((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  }
  //   function to handle sign in
  const signIn = (e) => {
    e.preventDefault();
    setSignInError("");
    // client side error handling
    let isError = false;
    for (let credential in credentials) {
      if (credentials[credential] === "") {
        setFormError((state) => ({
          ...state,
          [credential]: true,
        }));
        isError = true;
      } else {
        setFormError((prev) => ({
          ...prev,
          [credential]: false,
        }));
      }
    }

    if (isError) return;

    // trigger sign in
    setIsSigningIn(true);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          minHeight: "100vh",
          py: 10,
          boxSizing: "border-box",
          backgroundColor: "background.signin",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundBlendMode: "overlay",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            px: 4,
            py: 6,
            width: "90%",
            maxWidth: "350px",
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" color="text.primary">
            Welcome back!
          </Typography>
          <Typography variant="h5" color="text.primary">
            Sign in to continue.
          </Typography>

          <TextField
            // html input attribute
            sx={textFieldStyle}
            name="email"
            type="email"
            color="primary"
            placeholder="johndoe@email.com"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={credentials.email}
            error={formError.email}
            helperText={formError.email && "Please enter email"}
          />
          <TextField
            sx={textFieldStyle}
            name="password"
            type="password"
            color="primary"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={credentials.password}
            error={formError.password}
            helperText={formError.password && "Please enter password"}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={signIn}
            type="submit"
            sx={{ width: "100%", my: 1 }}
          >
            Sign in
          </Button>
          <Typography variant="body1" color="text.primary">
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <span
                style={{ color: theme.palette.text.primary, fontWeight: 600 }}
              >
                Sign Up
              </span>
            </Link>
            {"  "}
            now
          </Typography>
        </Card>

        {/* alert in case of error */}
        {signInError && (
          <Box sx={{ position: "fixed", top: "100px" }}>
            <MyAlert severity="error">{signInError}</MyAlert>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SignInScreen;
