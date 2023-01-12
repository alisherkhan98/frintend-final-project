// react
import React from "react";
// MUI
import { Box, Button, Container, Typography } from "@mui/material";
// components
import Navbar from "../components/Navbar";
import MyAlert from "../components/MyAlert";
// router
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/features/shopSlice";

function SuccessScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // loading
  const { isLoading } = useSelector((state) => state.loading);

  if (!isLoading) {
    dispatch(clearCart());
  }

  return (
    <Box
      sx={{
        backgroundColor: "neutral.main",
        py: 8,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Navbar />
      <Container>
        <Typography
          color="primary"
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={5}
          mt={5}
        >
          Success
        </Typography>
      </Container>
      <MyAlert severity="success">
        Your order was successfully made. Your trees will be planted ASAP!
      </MyAlert>
      <Container sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Home
        </Button>
      </Container>
    </Box>
  );
}

export default SuccessScreen;
