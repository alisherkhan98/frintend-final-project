// react
import React from "react";
// MUI
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function CartRow() {
  const { cart } = useSelector((state) => state.shop);
  return (
    <Stack>
      <img
        src={cart[0].img}
        style={{ height: 100, width: 100, objectFit: "cover" }}
      />
      <Typography variant="subtitle1">{cart[0]?.name}</Typography>
      <Box>{cart[0].price}</Box>
      <Box>{cart[0].amount}</Box>
    </Stack>
  );
}

export default CartRow;
