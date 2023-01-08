// react
import React, { useRef } from "react";
// MUI
import { Box, Button, IconButton, Typography, Container } from "@mui/material";

// icons
import { HiChevronDown } from "react-icons/hi";

function Hero({ bgUrl, text, buttonText }) {
  const heroRef = useRef(null);

  const scrollDown = () => {
    window.scrollTo({
      top: heroRef.current.clientHeight - 50,
      behavior: "smooth",
    });
  };
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
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.65)",
        backgroundBlendMode: "multiply",
        transition: "all .5s ",
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
          {text}
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
          onClick={scrollDown}
        >
          {buttonText}
        </Button>
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "10%",
            transform: "translate(-50%, 1.5rem)",
          }}
          onClick={scrollDown}
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
