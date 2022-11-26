// react
import React from "react";
// components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
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
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Hero />
      <Calculator />
      {footprintDetails && <ResultCards />}
    </Theme>
  );
}

export default App;
