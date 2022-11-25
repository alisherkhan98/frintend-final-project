// react
import React from "react";
// components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Calculator from "./components/Calculator/Calculator";
import Theme from "./Theme";
// redux
import { useSelector } from "react-redux";
import ResultCards from "./components/ResultCards";

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { footprintDetails } = useSelector((state) => state.flightData);
  console.log(footprintDetails);

  return (
    <Theme isDarkMode={isDarkMode}>
      <Navbar />
      <Hero />
      <Calculator />
      {footprintDetails && <ResultCards />}
    </Theme>
  );
}

export default App;
