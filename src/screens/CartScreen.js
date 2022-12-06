import React from "react";
// MUI
import { Box, Container, Paper } from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getTotalAmount } from "../redux/features/shopSlice";
// components
import CartRow from "../components/CartRow";

function CartScreen() {
  const { cart, totalAmount } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  dispatch(getTotalAmount());
  console.log(cart);
  return (
    <Box
      sx={{
        backgroundColor: "neutral.main",
        py: 8,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Container>
        <Paper
          component="form"
          sx={{
            padding: " 40px 32px",
            mt: 8,
            borderRadius: 5,
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          }}
        >
          <CartRow />
        </Paper>
      </Container>
    </Box>
  );
}

export default CartScreen;
