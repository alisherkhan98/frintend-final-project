import React from "react";
// router
import { useActionData } from "react-router-dom";
// components
import ContactForm from "../components/ContactForm";
import ContactSuccess from "../components/ContactSuccess";
import Navbar from "../components/Navbar";

function ContactScreen() {
  const data = useActionData();
  const isSuccess = data?.success;
  return (
    <>
      <Navbar />
      {isSuccess ? <ContactSuccess /> : <ContactForm data={data} />}
    </>
  );
}

export default ContactScreen;
