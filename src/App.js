// react
import React from "react";
// components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import DidYouKnow from "./components/DidYouKnow";
import Theme from "./theme";
import MyAlert from "./components/MyAlert";
import Footer from "./components/Footer";
// redux
import { useSelector } from "react-redux";
import ResultCards from "./components/ResultCards";

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { footprintDetails, isFetchingFootprint, footprintError } = useSelector(
    (state) => state.flightData
  );
  console.log(footprintError);
  return (
    <Theme isDarkMode={isDarkMode}>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Hero />
      <Calculator />
      {/* alert for errors */}
      {footprintError && !footprintDetails && (
        <MyAlert
          text={
            "Error code: " +
            footprintError.status +
            ". " +
            footprintError.message
          }
          severity="error"
        />
      )}
      {footprintDetails && !isFetchingFootprint && <ResultCards />}
      <DidYouKnow />
      <Footer />
    </Theme>
  );
}

export default App;
