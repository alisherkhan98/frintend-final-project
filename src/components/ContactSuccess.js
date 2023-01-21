import { Alert, Box, Container, Typography } from "@mui/material";
import React from "react";

function ContactSuccess() {
  return (
    <Box
      sx={{
        backgroundColor: "neutral.main",
        py: 8,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Container>
        <Typography
          color="primary"
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={5}
          mt={5}
        >
          Success!
        </Typography>
        <Alert severity="success">Your message was successfully sent</Alert>
      </Container>
    </Box>
  );
}

export default ContactSuccess;
