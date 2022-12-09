// react
import React from "react";
// MUI
import { Box, CircularProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "neutral.main",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
}

export default LoadingScreen;
