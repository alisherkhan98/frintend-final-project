// react
import React from "react";
// MUI
import { Box, Button, IconButton, Typography } from "@mui/material";
// image
import bg from "../../assets/img/hero.jpg";
// icons
import { HiChevronDown } from "react-icons/hi";

function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",

        // background
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.65)",
        backgroundBlendMode: "multiply",
      }}
    >
      <Typography
        variant="h3"
        color="#f7f7f7"
        textAlign="center"
        fontWeight={700}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "90%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Estimate your next flight's carbon footprint
      </Typography>
      <Button
        variant="outlined"
        color="neutral"
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "10%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Calculate Now
      </Button>
      <IconButton
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "10%",
          transform: "translate(-50%, 1.5rem)",
        }}
        disableRipple
        color="neutral"
      >
        <HiChevronDown />
      </IconButton>
    </Box>
  );
}

export default Hero;
