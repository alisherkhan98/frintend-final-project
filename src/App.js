// react
import React from "react";
// components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Calculator from "./components/Calculator/Calculator";
import Theme from "./Theme";
// redux
import { useSelector } from "react-redux";

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const { footprintDetails } = useSelector((state) => state.flightData);
  console.log(footprintDetails);

  return (
    <Theme isDarkMode={isDarkMode}>
      <Navbar />
      <Hero />
      <Calculator />
    </Theme>
  );
}

export default App;
