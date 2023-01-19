import React from "react";
// MUI
import { Link } from "@mui/material";

function FooterLink({ children, href }) {
  return (
    <Link
      color="text.secondary"
      sx={{
        mx: 3,
        transition: "transform .2s ease",
        "&:hover": {
          color: "primary.main",
          transform: "scale(1.2)",
        },
      }}
      href={href}
      target="_blank"
    >
      {children}
    </Link>
  );
}

export default FooterLink;
