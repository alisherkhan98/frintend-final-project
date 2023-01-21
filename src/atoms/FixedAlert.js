import { Alert, Box, Fade } from "@mui/material";
import React, { useEffect } from "react";

function FixedAlert({ severity, children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // open after a delay
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 100,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        zIndex: 9999,
      }}
    >
      <Fade in={isOpen}>
        <Alert severity={severity}>{children}</Alert>
      </Fade>
    </Box>
  );
}

export default FixedAlert;
