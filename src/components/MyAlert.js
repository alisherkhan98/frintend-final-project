// react
import React, { useEffect } from "react";
// MUI
import { Alert, Box, Container, Fade } from "@mui/material";

function MyAlert({ text, severity }) {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  }, []);
  return (
    <Box sx={{ backgroundColor: "neutral.main", pb: 5 }}>
      <Container>
        <Fade in={isOpen}>
          <Alert severity={severity} sx={{}}>
            {text}
          </Alert>
        </Fade>
      </Container>
    </Box>
  );
}

export default MyAlert;
