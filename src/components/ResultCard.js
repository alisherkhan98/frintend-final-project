import React, { useEffect } from "react";
import { Box, Card, Typography, useTheme } from "@mui/material";

import { BsFillCircleFill } from "react-icons/bs";

function ResultCard({ title, value, children, timeout }) {
  const [opacity, setOpacity] = React.useState(0);
  const theme = useTheme();

  React.useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, timeout);
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: opacity,
        transition: "opacity .5s ease",
        py: 3,
      }}
    >
      <Typography variant="body1" textAlign="center" mb="1rem">
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
            color: "icons.main",
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
      <Typography variant="body1" fontWeight={700} textAlign="center" mt="1rem">
        {value}
      </Typography>
    </Card>
  );
}

export default ResultCard;
