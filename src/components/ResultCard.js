import React from "react";
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useTheme,
} from "@mui/material";

import { BsFillCircleFill } from "react-icons/bs";

function ResultCard({ title, value, children }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1" textAlign="center" mb="1rem">
        {title}
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: 100,
          height: 100,
          "& .card-icon": {
            width: "45px",
            height: "45px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "#565656",
          },
        }}
      >
        <BsFillCircleFill
          size="100%"
          style={{ position: "absolute" }}
          color={theme.palette.secondary.main}
        />
        {children}
      </Box>
      <Typography variant="body1" fontWeight={600} textAlign="center" mt="1rem">
        {value}
      </Typography>
    </Card>
  );
}

export default ResultCard;
