import React from "react";
// MUI
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
// atoms
import NavbarLogo from "../atoms/NavbarLogo";
import NavDrawerItem from "../atoms/NavDrawerItem";
// icons
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
// redux
import { useSelector } from "react-redux";
// atoms
import DarkModeIcon from "../atoms/DarkModeIcon";
// router
import { useNavigate } from "react-router-dom";

function MobileDrawer({
  handleDrawerToggle,
  setDialogOpen,
  mobileOpen,
  toggleDarkMode,
}) {
  const navigate = useNavigate();
  // user
  const { user } = useSelector((state) => state.auth);
  // dark mode
  const { isDarkMode } = useSelector((state) => state.darkMode);

  // drawer for mobiles
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <NavbarLogo />
      <Divider />

      <List onClick={handleDrawerToggle}>
        <NavDrawerItem text="Home" onClick={() => navigate("/")}>
          <FaHome />
        </NavDrawerItem>

        <NavDrawerItem text="Shop" onClick={() => navigate("/shop")}>
          <FaMoneyBill />
        </NavDrawerItem>

        <NavDrawerItem text="Cart" onClick={() => navigate("/cart")}>
          <BsCart3 />
        </NavDrawerItem>

        {user ? (
          <NavDrawerItem text="Sign Out" onClick={() => setDialogOpen(true)}>
            <MdLogin />
          </NavDrawerItem>
        ) : (
          <NavDrawerItem text="Sign In" onClick={() => navigate("/signin")}>
            <MdLogin />
          </NavDrawerItem>
        )}

        <NavDrawerItem
          text={isDarkMode ? "Light mode" : "Dark mode"}
          onClick={toggleDarkMode}
        >
          <DarkModeIcon />
        </NavDrawerItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "66vw",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default MobileDrawer;
