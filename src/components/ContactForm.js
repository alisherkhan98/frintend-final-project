import React from "react";
// MUI
import { Box, Typography, TextField, Button, Card } from "@mui/material";

// router
import { Form, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";

const textFieldStyle = {
  width: 1,
  mb: 1,
};

function ContactForm({ data }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        py: 10,
        boxSizing: "border-box",
        backgroundColor: "neutral.main",
      }}
    >
      <Form method="post" action="/contact">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            px: 4,
            py: 6,
            width: "90vw",
            maxWidth: "350px",
          }}
          noValidate
          autoComplete="false"
        >
          <Typography variant="h4" color="text.primary">
            Hi {user ? `, ${user.name}` : ""}!
          </Typography>
          <Typography variant="h5" color="text.primary" mb={2}>
            Let's get in touch
          </Typography>

          <TextField
            // html input attribute
            sx={textFieldStyle}
            name="email"
            type="email"
            color="primary"
            placeholder="johndoe@email.com"
            label="Email"
            variant="outlined"
            mb={2}
            error={Boolean(data?.emailError)}
            helperText={data?.emailError && data.emailError}
          />
          <TextField
            sx={textFieldStyle}
            name="message"
            type="text"
            color="primary"
            placeholder="Enter your message here..."
            label="Message"
            variant="outlined"
            multiline
            minRows={4}
            maxRows={6}
            error={Boolean(data?.messageError)}
            helperText={data?.messageError && data.messageError}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "100%", my: 1 }}
          >
            Sign in
          </Button>
        </Card>
      </Form>
    </Box>
  );
}

export default ContactForm;
