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
} from "@mui/material";
// icons
import { FaBars } from "react-icons/fa";

// constants
const drawerWidth = "66vw";
const navItems = ["Home", "About", "Contact"];

function Navbar({ setIsDarkMode, isDarkMode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  // listener for scroll
  React.useEffect(() => {
    function navTransition() {
      if (window.scrollY > 150) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
    window.addEventListener("scroll", navTransition);
    return () => window.removeEventListener("scroll", navTransition);
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        color={show ? "neutral" : "transparent"}
        elevation={0}
        sx={{
          opacity: 0.95,
          transition: "all .3s ease",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            color={show ? "primary" : "white"}
          >
            LOGO
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: `${show ? "primary" : "white"}` }}
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FaBars />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
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
