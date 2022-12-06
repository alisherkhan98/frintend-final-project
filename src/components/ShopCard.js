// react
import React from "react";
// MUI
import { Card, CardHeader, CardMedia } from "@mui/material";
// data
import data from "../data";

function ShopCard() {
  return (
    <Card sx={{ p: 0 }}>
      <CardHeader title={data[0].name} />
      <CardMedia
        image={data[0].img}
        component="img"
        height="150"
        sx={{ width: "100%" }}
      />
    </Card>
  );
}

export default ShopCard;
