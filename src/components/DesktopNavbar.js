import React from "react";
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
// atoms
import DarkModeIcon from "../atoms/DarkModeIcon";
import NavbarLogo from "../atoms/NavbarLogo";
// redux
import { useSelector } from "react-redux";
// router
import { useLocation, useNavigate } from "react-router-dom";

function DesktopNavbar({ setDialogOpen, toggleDarkMode, handleDrawerToggle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  let location = useLocation();

  // state to show navbar
  const [show, setShow] = React.useState(false);

  // user
  const { user } = useSelector((state) => state.auth);

  // cart
  const { cart } = useSelector((state) => state.shop);

  // calculate total amount
  const totalAmount = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

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
  return (
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
          {/* button to toggle drawer */}

          <IconButton
            color={show ? "primary" : "hero"}
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FaBars />
          </IconButton>

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
                onClick={() => setDialogOpen(true)}
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
  );
}

export default DesktopNavbar;
