import React from "react";
import { Outlet } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

function ContactScreen() {
  return (
    <>
      <Navbar />
      <ContactForm />
    </>
  );
}

export default ContactScreen;
