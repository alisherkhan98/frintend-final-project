import React from "react";
// MUI
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  IconButton,
  Card,
} from "@mui/material";
// Router
import { useNavigate, Link } from "react-router-dom";
// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";
// icons
import { AiFillHome } from "react-icons/ai";
// redux
import { useDispatch } from "react-redux";
// images
import wave from "../assets/img/wavebg.png";

const textFieldStyle = {
  width: 250,
  my: 1,
};

function SignInScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

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

    //     let isAborted = false;
    //     // firebase sign in
    //     signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    //       .catch((error) => {
    //         isAborted = true;
    //         dispatch(openAlert({ message: error.code, severity: "error" }));
    //         setTimeout(() => {
    //           dispatch(closeAlert());
    //         }, 2000);
    //       })
    //       .then((user) => {
    //         if (isAborted) return;
    //         dispatch(openLoading());
    //         navigate("/");
    //       });
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
          py: 8,
          boxSizing: "border-box",
          backgroundImage: `url(${wave})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100vw 80vh",
          backgroundPosition: "bottom",
          backgroundColor: "neutral.main",
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
            zIndex: 10,
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
          />
          <TextField
            sx={textFieldStyle}
            name="password"
            type="password"
            color="primary"
            placeholder="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={credentials.password}
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
      </Box>
    </>
  );
}

export default SignInScreen;
