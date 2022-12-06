// react
import React, { useEffect } from "react";
// MUI
import { Alert, Container, Fade } from "@mui/material";

function MyAlert({ children, severity }) {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  }, []);
  return (
    <Container>
      <Fade in={isOpen}>
        <Alert severity={severity} sx={{ alignItems: "center" }}>
          {children}
        </Alert>
      </Fade>
    </Container>
  );
}

export default MyAlert;
