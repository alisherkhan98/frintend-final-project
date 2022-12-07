import React, { useEffect } from "react";
// MUI
import { Box, Container, Divider, Paper } from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
// components
import CartRow from "../components/CartRow";

function CartScreen() {
  const { cart, totalAmount } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

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
          sx={{
            px: { xs: 3, sm: 5 },
            py: { xs: 2, sm: 3 },
            mt: 8,
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
      </Container>
    </Box>
  );
}

export default CartScreen;
