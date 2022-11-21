// react
import React from "react";
// MUI
import { Card, Container, Paper, Box, Typography } from "@mui/material";

function Calculator() {
  return (
    <Container>
      <Box component="form" py={3}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 5,
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h6">Enter details of your flight</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Calculator;
