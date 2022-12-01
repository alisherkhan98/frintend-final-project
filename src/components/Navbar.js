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
} from "@mui/material";
// icons
import { FaBars } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

// constants
const drawerWidth = "66vw";

function Navbar({ setIsDarkMode, isDarkMode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const theme = useTheme();

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

  // drawer for mobiles
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LOGO
      </Typography>
      <Divider />
      <List>
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton
              sx={{ mr: 2 }}
              onClick={toggleDarkMode}
              edge="end"
              aria-label="dark-mode"
              color={theme.palette.text.secondary}
            >
              {darkModeIcon}{" "}
            </IconButton>
          }
        >
          <ListItemButton
            disableRipple
            onClick={toggleDarkMode}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={"Dark mode"} />
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
          transition: "all .5s ease",
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
              <Button color={show ? "primary" : "hero"} sx={{ mx: 2 }}>
                Home
              </Button>
              <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                Support
              </Button>
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
