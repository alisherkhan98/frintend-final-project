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

function MobileDrawer({
  handleDrawerToggle,
  setDialogOpen,
  mobileOpen,
  toggleDarkMode,
}) {
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
        <NavDrawerItem text="Home" navigateTo="/">
          <FaHome />
        </NavDrawerItem>

        <NavDrawerItem text="Shop" navigateTo="/shop">
          <FaMoneyBill />
        </NavDrawerItem>

        <NavDrawerItem text="Cart" navigateTo="/cart">
          <BsCart3 />
        </NavDrawerItem>

        {user ? (
          <ListItem>
            <ListItemButton disableRipple onClick={() => setDialogOpen(true)}>
              <ListItemIcon>
                <MdLogout />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <NavDrawerItem text="Sign In" navigateTo="/signin">
            <MdLogin />
          </NavDrawerItem>
        )}

        <ListItem>
          <ListItemButton disableRipple onClick={toggleDarkMode}>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText primary={isDarkMode ? "Light mode" : "Dark mode"} />
          </ListItemButton>
        </ListItem>
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
