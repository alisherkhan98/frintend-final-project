import React from "react";
// MUI
import { SvgIcon, Typography } from "@mui/material";
// icons
import { HiPaperAirplane } from "react-icons/hi";

function NavbarLogo() {
  return (
    <Typography variant="h6" sx={{ my: 2 }}>
      IMP
      <SvgIcon sx={{ position: "relative", top: 2, fontSize: "inherit" }}>
        <HiPaperAirplane size="24px" />
      </SvgIcon>
      CT
    </Typography>
  );
}

export default NavbarLogo;
