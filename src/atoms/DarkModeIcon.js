import React from "react";
// redux
import { useSelector } from "react-redux";
// icons
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

function DarkModeIcon() {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  return isDarkMode ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />;
}

export default DarkModeIcon;
