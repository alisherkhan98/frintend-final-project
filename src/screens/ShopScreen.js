// react
import React from "react";
// images
import bg from "../assets/img/hero2.jpg";
// components
import Hero from "../components/Hero";

function ShopScreen() {
  return (
    <>
      <Hero bgUrl={bg} text="It's not too late" buttonText="Act Now" />{" "}
    </>
  );
}

export default ShopScreen;
