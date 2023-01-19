// react
import React, { useState } from "react";
// MUI
import { Box, useTheme } from "@mui/material";

// router
import { useLocation, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "../redux/features/darkModeSlice";
// components
import SignOutConfirm from "./SignOutConfirm";
import MobileDrawer from "./MobileDrawer";
import DesktopNavbar from "./DesktopNavbar";

function Navbar() {
  const dispatch = useDispatch();
  // darkmode
  const { isDarkMode } = useSelector((state) => state.darkMode);

  // state of drawer on mobile
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // function to toggle drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function to toggle dark mode
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DesktopNavbar
        toggleDarkMode={toggleDarkMode}
        setDialogOpen={setDialogOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <MobileDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        setDialogOpen={setDialogOpen}
        toggleDarkMode={toggleDarkMode}
      />

      <SignOutConfirm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </Box>
  );
}

export default Navbar;
