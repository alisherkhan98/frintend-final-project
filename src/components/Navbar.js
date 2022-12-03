// react
import * as React from "react";
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
} from "@mui/material";
// icons
import { FaBars, FaHome, FaMoneyBill } from "react-icons/fa";
import {
  MdLogin,
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineWbSunny,
} from "react-icons/md";
// router
import { useLocation, useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { BsCart3 } from "react-icons/bs";

// constants
const drawerWidth = "66vw";

function Navbar({ setIsDarkMode, isDarkMode }) {
  // state of drawer on mobile
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // state to show navbar
  const [show, setShow] = React.useState(false);
  // user
  const { user } = useSelector((state) => state.auth);

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

    if (location.pathname === "/signin" || location.pathname === "/signup") {
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
    setIsDarkMode(!isDarkMode);
  };

  // icon for dark mode changes if toggled
  const darkModeIcon = isDarkMode ? (
    <MdOutlineWbSunny />
  ) : (
    <MdOutlineDarkMode />
  );

  // function to handle click on sign out
  function handleSignOut() {
    navigate("/");
    signOut(auth);
  }

  // drawer for mobiles
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LOGO
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
          <ListItemButton disableRipple onClick={() => navigate("/support")}>
            <ListItemIcon>
              <FaMoneyBill />
            </ListItemIcon>
            <ListItemText primary={"Support"} />
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
            <ListItemButton disableRipple onClick={handleSignOut}>
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
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              color={show ? "primary" : "white"}
            >
              LOGO
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
                sx={{ mr: 2 }}
                onClick={() => navigate("/cart")}
                edge="end"
                aria-label="dark-mode"
                color={show ? theme.palette.text.secondary : "hero"}
              >
                <BsCart3 />
              </IconButton>

              <Button
                color={show ? "primary" : "hero"}
                sx={{ mr: 2 }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button color={show ? "primary" : "hero"} sx={{ mr: 2 }}>
                Support
              </Button>
              {user ? (
                <Button
                  variant="outlined"
                  color={show ? "primary" : "hero"}
                  onClick={handleSignOut}
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
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <FaBars />
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
    </Box>
  );
}

export default Navbar;
