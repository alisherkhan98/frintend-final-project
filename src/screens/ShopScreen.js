// react
import React from "react";
// MUI
import { Box, Container, Grid } from "@mui/material";
// images
import bg from "../assets/img/hero2.jpg";
// components
import Hero from "../components/Hero";
import ShopCard from "../components/ShopCard";
import Footer from "../components/Footer";
// data
import data from "../data";

function ShopScreen() {
  return (
    <>
      <Hero bgUrl={bg} text="It's not too late" buttonText="Act Now" />{" "}
      <Box sx={{ backgroundColor: "neutral.main", py: 8 }}>
        <Container>
          <Grid container>
            {data.map((treeData) => (
              <Grid item xs={12} sm={4} p={2}>
                <ShopCard treeData={treeData} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default ShopScreen;
