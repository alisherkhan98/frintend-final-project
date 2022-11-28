// react
import React from "react";
// components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import DidYouKnow from "./components/DidYouKnow";
import Theme from "./Theme";
// redux
import { useSelector } from "react-redux";
import ResultCards from "./components/ResultCards";

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { footprintDetails, isFetchingFootprint } = useSelector(
    (state) => state.flightData
  );
  console.log(footprintDetails);

  return (
    <Theme isDarkMode={isDarkMode}>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Hero />
      <Calculator />
      {footprintDetails && !isFetchingFootprint && <ResultCards />}
      <DidYouKnow />
    </Theme>
  );
}

export default App;
