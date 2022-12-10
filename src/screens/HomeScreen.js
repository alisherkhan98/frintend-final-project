// react
import React, { useEffect, useState } from "react";
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
// image
import bg from "../assets/img/hero.jpg";

function HomeScreen() {
  const { footprintDetails, isFetchingFootprint, footprintError } = useSelector(
    (state) => state.flightData
  );
  const [backgroundColor, setBackgroundColor] = useState("#262626");

  const image = new Image();
  image.src = bg;
  useEffect(() => {
    image.onload = setBackgroundColor("rgba(0,0,0,0.65)");
  }, []);
  return (
    <>
      <Hero
        bgUrl={bg}
        text="Estimate your next flight's carbon footprint"
        buttonText="Calculate Now"
        backgroundColor={backgroundColor}
      />
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
