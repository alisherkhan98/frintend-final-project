// react
import React, { useState } from "react";
// Router
import { Link } from "react-router-dom";
// MUI
import {
  useTheme,
  Box,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
// components
import MyAlert from "../components/MyAlert";
// images
import bg from "../assets/img/hero.jpg";
// custom hooks
import useSignUp from "../custom-hooks/useSignUp";

const textFieldStyle = {
  width: 1,
  mb: 1,
};

function SignUpScreen() {
  const theme = useTheme();

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({});
  const [signUpError, setSignUpError] = useState("");

  useSignUp(credentials, isSigningUp, setIsSigningUp, setSignUpError);

  //   function to make components controlled
  function handleChange(e) {
    const target = e.target;
    setCredentials((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  }

  //   function to handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setSignUpError("");

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
    if (credentials.password !== credentials.confirmPassword) {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: true,
        passwordsDontMatch: true,
      }));
      isError = true;
    } else {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: false,
        passwordsDontMatch: false,
      }));
    }

    if (isError) return;

    // trigger sign up hook
    setIsSigningUp(true);
  }

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
          backgroundColor: "neutral.main",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundBlendMode: "overlay",
        }}
      >
        <Card
          component="form"
          noValidate
          autoComplete="off"
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
        >
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="h5">Create a new account.</Typography>
          {/* name */}
          <TextField
            required
            sx={textFieldStyle}
            name="name"
            type="text"
            color="secondary"
            placeholder="John Doe"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            error={formError.name}
            helperText={formError.name && "Please enter name"}
          />
          {/* email */}
          <TextField
            required
            sx={textFieldStyle}
            name="email"
            type="email"
            color="secondary"
            placeholder="johndoe@email.com"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            error={formError.email}
            helperText={formError.email && "Please enter email"}
          />
          {/* password */}
          <TextField
            required
            sx={textFieldStyle}
            name="password"
            type="password"
            color="secondary"
            placeholder="Password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            error={formError.password}
            helperText={formError.password && "Please enter password"}
          />
          {/* confirm password */}
          <TextField
            required
            sx={textFieldStyle}
            name="confirmPassword"
            type="password"
            color="secondary"
            placeholder="Confirm password"
            label="Confirm password"
            variant="outlined"
            onChange={handleChange}
            error={formError.confirmPassword}
            helperText={
              formError.confirmPassword &&
              (formError.passwordsDontMatch
                ? "Passwords don't match"
                : "Please re-enter password")
            }
          />
          <Button
            sx={{ width: "100%", my: 1 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Sign up
          </Button>
          <Typography variant="body1">
            Already have an account?{" "}
            <Link to="/signin">
              {" "}
              <span
                style={{ color: theme.palette.text.primary, fontWeight: 600 }}
              >
                Sign In
              </span>
            </Link>
          </Typography>
        </Card>
        {signUpError && (
          <Box sx={{ position: "fixed", top: "100px" }}>
            <MyAlert severity="error">{signUpError}</MyAlert>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SignUpScreen;
