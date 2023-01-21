// react
import React from "react";
// redux
import { useSelector } from "react-redux";
// components
import Hero from "../components/Hero";
import DidYouKnow from "../components/DidYouKnow";
import MyAlert from "../components/MyAlert";
import ResultCards from "../components/ResultCards";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
// MUI
import { Box } from "@mui/material";

// router
import { Outlet, useLoaderData } from "react-router-dom";

function HomeScreen() {
  const { footprintDetails, isFetchingFootprint, footprintError } = useSelector(
    (state) => state.flightData
  );
  const bgImage = useLoaderData();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Hero
        bgUrl={bgImage.src}
        text="Estimate your next flight's carbon footprint"
        buttonText="Calculate Now"
      />
      {/* outlet to put calculator here */}
      <Outlet />
      {/* alert for errors */}
      {footprintError && !footprintDetails && (
        <Box sx={{ backgroundColor: "neutral.main", pb: 8 }}>
          <MyAlert severity="error">
            {"Error code: " +
              footprintError.status +
              ". " +
              footprintError.message}
          </MyAlert>
        </Box>
      )}
      {footprintDetails && !isFetchingFootprint && <ResultCards />}
      <DidYouKnow />
      <Footer />
    </>
  );
}

export default HomeScreen;
