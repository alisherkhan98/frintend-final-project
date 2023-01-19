// react
import React, { useState } from "react";
// MUI
import {
  AppBar,
  Box,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Container,
  useTheme,
  Badge,
  SvgIcon,
} from "@mui/material";
// icons
import { FaBars, FaHome } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiPaperAirplane } from "react-icons/hi";

// router
import { useLocation, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "../redux/features/darkModeSlice";
// components
import SignOutConfirm from "./SignOutConfirm";
import MobileDrawer from "./MobileDrawer";
// atoms
import DarkModeIcon from "../atoms/DarkModeIcon";
import NavbarLogo from "../atoms/NavbarLogo";

function Navbar() {
  const dispatch = useDispatch();
  // darkmode
  const { isDarkMode } = useSelector((state) => state.darkMode);

  // state of drawer on mobile
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // state to show navbar
  const [show, setShow] = React.useState(false);
  // user
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.shop);

  // dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  let location = useLocation();

  // listener for scroll
  React.useEffect(() => {
    function navTransition() {
      if (window.scrollY > 150) {
        setShow(true);
      } else {
        setShow(false);
      }
    }

    if (
      location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/success" ||
      location.pathname === "/cart"
    ) {
      setShow(true);
    } else {
      setShow(false);
      window.addEventListener("scroll", navTransition);
      return () => window.removeEventListener("scroll", navTransition);
    }
  }, [location.pathname]);

  // function to toggle drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function to toggle dark mode
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  // function to handle click on sign out
  function openSignOutdialog() {
    setDialogOpen(true);
  }

  // calculate total amount
  const totalAmount = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        color={show ? "neutral" : "transparent"}
        elevation={show ? 5 : 0}
        sx={{
          opacity: 0.95,
          transition: "all .3s ease",
        }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                color: show ? "primary" : "white",
              }}
            >
              <NavbarLogo />
            </Box>

            <Box
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              <IconButton
                sx={{ mr: { sm: 1, md: 3 } }}
                onClick={toggleDarkMode}
                edge="end"
                aria-label="dark-mode"
                color={show ? theme.palette.text.secondary : "hero"}
              >
                <DarkModeIcon />
              </IconButton>

              <IconButton
                sx={{ mr: { sm: 1, md: 3 } }}
                onClick={() => navigate("/cart")}
                edge="end"
                aria-label="cart"
                color={show ? theme.palette.text.secondary : "hero"}
              >
                <Badge color="primary" badgeContent={totalAmount}>
                  <BsCart3 />
                </Badge>
              </IconButton>

              <IconButton
                sx={{ mr: { sm: 1, md: 3 } }}
                onClick={() => navigate("/")}
                edge="end"
                aria-label="cart"
                color={show ? theme.palette.text.secondary : "hero"}
              >
                <FaHome />
              </IconButton>

              <Button
                color={show ? "icons" : "hero"}
                sx={{ mr: { sm: 1, md: 3 } }}
                onClick={() => navigate("/shop")}
              >
                Shop
              </Button>
              <Button
                color={show ? "icons" : "hero"}
                sx={{ mr: { sm: 1, md: 3 } }}
                onClick={() => navigate("/shop")}
              >
                Shop
              </Button>
              {user ? (
                <Button
                  variant="outlined"
                  color={show ? "primary" : "hero"}
                  onClick={openSignOutdialog}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color={show ? "primary" : "hero"}
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
              )}
            </Box>

            <IconButton
              color={show ? "primary" : "hero"}
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <FaBars />
            </IconButton>

            <IconButton
              sx={{
                position: "relative",
                display: { xs: "flex", sm: "none" },
              }}
              onClick={() => navigate("/cart")}
              edge="start"
              aria-label="dark-mode"
              color={show ? theme.palette.text.secondary : "hero"}
            >
              <Badge color="primary" badgeContent={totalAmount}>
                <BsCart3 />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

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
