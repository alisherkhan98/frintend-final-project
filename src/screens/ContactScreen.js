import React from "react";
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
    </>
  );
}

export default ContactScreen;
