// react
import React, { useRef } from "react";
// MUI
import { Box, Button, IconButton, Typography, Container } from "@mui/material";
// image
import bg from "../assets/img/hero.jpg";
// icons
import { HiChevronDown } from "react-icons/hi";

function Hero() {
  const heroRef = useRef(null);
  return (
    <Box
      component="section"
      id="hero"
      ref={heroRef}
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
      <Container>
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
          color="hero"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "10%",
            transform: "translate(-50%, -50%)",
            "&:hover": {
              transform: "translate(-50%, -50%) scale(1.05)",
            },
          }}
          onClick={() => {
            window.scrollTo({
              top: heroRef.current.clientHeight - 50,
              behavior: "smooth",
            });
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
          color="hero"
        >
          <HiChevronDown />
        </IconButton>
      </Container>
    </Box>
  );
}

export default Hero;
