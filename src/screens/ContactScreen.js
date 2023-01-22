import React from "react";
// MUI
import { Box } from "@mui/material";
// router
import { useActionData } from "react-router-dom";
// components
import FixedAlert from "../atoms/FixedAlert";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

function ContactScreen() {
  let data = useActionData();
  console.log(data);
  return (
    <>
      <Navbar />
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
        <ContactForm data={data} />
        {data?.success && (
          <FixedAlert severity="success">
            Your message was successfully sent
          </FixedAlert>
        )}
        {data?.serviceError && (
          <FixedAlert severity="error">
            There was an error while sending the message
          </FixedAlert>
        )}
      </Box>
    </>
  );
}

export default ContactScreen;
