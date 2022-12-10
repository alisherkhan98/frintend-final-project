// react
import React, { useEffect, useRef } from "react";
// MUI
import { Alert, Container, Fade } from "@mui/material";

function MyAlert({ children, severity }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const alertRef = useRef(null);

  // open after a delay
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  }, []);

  // scroll to alert every time it is rendered
  useEffect(() => {
    window.scrollTo({
      top:
        window.pageYOffset + alertRef.current.getBoundingClientRect().top - 100,
      behavior: "smooth",
    });
  }, [children]);

  return (
    <Container sx={{ zIndex: 9999 }} ref={alertRef}>
      <Fade in={isOpen}>
        <Alert severity={severity} sx={{ alignItems: "center", zIndex: 9999 }}>
          {children}
        </Alert>
      </Fade>
    </Container>
  );
}

export default MyAlert;
