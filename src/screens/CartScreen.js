import React, { useEffect } from "react";
// MUI
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
// components
import CartRow from "../components/CartRow";
import MyAlert from "../components/MyAlert";

function CartScreen() {
  const { cart } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  // calculate total amount
  const totalAmount = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

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
        <Typography
          color="primary"
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={5}
          mt={5}
        >
          Your Cart
        </Typography>
        {totalAmount ? (
          <Paper
            sx={{
              px: { xs: 3, sm: 5 },
              py: { xs: 2, sm: 3 },

              borderRadius: 5,
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            }}
          >
            {cart.map((item, index) => {
              const isLast = index == cart.length - 1;
              return (
                <React.Fragment key={item.id}>
                  <CartRow item={item} />
                  {!isLast && <Divider />}
                </React.Fragment>
              );
            })}
          </Paper>
        ) : (
          <MyAlert severity="warning">Your cart is empty</MyAlert>
        )}
      </Container>
    </Box>
  );
}

export default CartScreen;
