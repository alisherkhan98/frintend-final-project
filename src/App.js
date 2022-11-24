// react
import React from "react";
// components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Calculator from "./components/Calculator/Calculator";
import Theme from "./Theme";
function App() {
  return (
    <Theme>
      <Navbar />
      <Hero />
      <Calculator />
    </Theme>
  );
}

export default App;
