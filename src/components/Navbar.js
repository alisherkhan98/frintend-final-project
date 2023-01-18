// react
import React, { useState } from "react";
// MUI
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  Toolbar,
  Container,
  useTheme,
  ListItemIcon,
  Badge,
  SvgIcon,
} from "@mui/material";
// icons
import { FaBars, FaHome, FaMoneyBill } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiPaperAirplane } from "react-icons/hi";
import {
  MdLogin,
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineWbSunny,
} from "react-icons/md";
// router
import { useLocation, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "../redux/features/darkModeSlice";

// components
import SignOutConfirm from "./SignOutConfirm";

// constants
const drawerWidth = "66vw";

function Navbar({}) {
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

  // icon for dark mode changes if toggled
  const darkModeIcon = isDarkMode ? (
    <MdOutlineWbSunny />
  ) : (
    <MdOutlineDarkMode />
  );

  // function to handle click on sign out
  function openSignOutdialog() {
    setDialogOpen(true);
  }

  // calculate total amount
  const totalAmount = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  // drawer for mobiles
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        IMP
        <SvgIcon sx={{ position: "relative", top: 2, fontSize: "inherit" }}>
          <HiPaperAirplane size="24px" />
        </SvgIcon>
        CT
      </Typography>
      <Divider />

      <List onClick={handleDrawerToggle}>
        <ListItem>
          <ListItemButton disableRipple onClick={() => navigate("/")}>
            <ListItemIcon>
              <FaHome />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton disableRipple onClick={() => navigate("/shop")}>
            <ListItemIcon>
              <FaMoneyBill />
            </ListItemIcon>
            <ListItemText primary={"Shop"} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton disableRipple onClick={() => navigate("/cart")}>
            <ListItemIcon>
              <BsCart3 />
            </ListItemIcon>
            <ListItemText primary={"Cart"} />
          </ListItemButton>
        </ListItem>

        {user ? (
          <ListItem>
            <ListItemButton disableRipple onClick={openSignOutdialog}>
              <ListItemIcon>
                <MdLogout />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem>
            <ListItemButton disableRipple onClick={() => navigate("/signin")}>
              <ListItemIcon>
                <MdLogin />
              </ListItemIcon>
              <ListItemText primary={"Sign In"} />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem>
          <ListItemButton disableRipple onClick={toggleDarkMode}>
            <ListItemIcon>{darkModeIcon}</ListItemIcon>
            <ListItemText primary={isDarkMode ? "Light mode" : "Dark mode"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
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
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              color={show ? "primary" : "white"}
            >
              IMP
              <SvgIcon
                sx={{ position: "relative", top: 3, fontSize: "inherit" }}
              >
                <HiPaperAirplane size="24px" />
              </SvgIcon>
              CT
            </Typography>

            <Box
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              <IconButton
                sx={{ mr: 2 }}
                onClick={toggleDarkMode}
                edge="end"
                aria-label="dark-mode"
                color={show ? theme.palette.text.secondary : "hero"}
              >
                {darkModeIcon}
              </IconButton>

              <IconButton
                sx={{ mr: 2, position: "relative" }}
                onClick={() => navigate("/cart")}
                edge="end"
                aria-label="dark-mode"
                color={show ? theme.palette.text.secondary : "hero"}
              >
                <Badge color="primary" badgeContent={totalAmount}>
                  <BsCart3 />
                </Badge>
              </IconButton>

              <Button
                color={show ? "icons" : "hero"}
                sx={{ mr: 2 }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                color={show ? "icons" : "hero"}
                sx={{ mr: 2 }}
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
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <SignOutConfirm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </Box>
  );
}

export default Navbar;
