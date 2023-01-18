import React from "react";
// MUI
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// router
import { useNavigate } from "react-router-dom";

function NavDrawerItem({ children, onClick, text }) {
  const navigate = useNavigate();
  return (
    <ListItem>
      <ListItemButton disableRipple onClick={onClick}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavDrawerItem;
