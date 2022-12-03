// react
import React from "react";
// redux
import { useSelector } from "react-redux";
// components
import Hero from "../components/Hero";
import Calculator from "../components/Calculator";
import DidYouKnow from "../components/DidYouKnow";
import MyAlert from "../components/MyAlert";
import ResultCards from "../components/ResultCards";
import Footer from "../components/Footer";
// MUI
import { Box } from "@mui/material";

function HomeScreen() {
  const { footprintDetails, isFetchingFootprint, footprintError } = useSelector(
    (state) => state.flightData
  );
  return (
    <>
      <Hero />
      <Calculator />
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
