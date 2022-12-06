// react
import React from "react";
// MUI
import { Box, Container, Grid } from "@mui/material";
// images
import bg from "../assets/img/hero2.jpg";
// components
import Hero from "../components/Hero";
import ShopCard from "../components/ShopCard";

function ShopScreen() {
  return (
    <>
      <Hero bgUrl={bg} text="It's not too late" buttonText="Act Now" />{" "}
      <Box sx={{ backgroundColor: "neutral.main", py: 8 }}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <ShopCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ShopScreen;
