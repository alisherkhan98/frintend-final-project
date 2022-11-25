// react
import React from "react";
// MUI
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
// redux
import { useSelector } from "react-redux";
// icons
import { GiPathDistance } from "react-icons/gi";
import { FaCloud } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";

// components
import ResultCard from "./ResultCard";

function ResultCards() {
  const theme = useTheme();
  const { footprintDetails } = useSelector((state) => state.flightData);
  const distance = Math.round(footprintDetails.distance_value) + " km";
  const emissionPerPax =
    Math.round(footprintDetails.carbon_kg / footprintDetails.passengers) +
    " kg";
  const totalEmissions = Math.round(footprintDetails.carbon_kg) + " kg";

  return (
    <Box sx={{ backgroundColor: "neutral.main", py: 2 }}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={4} sx={{ padding: 2 }}>
            <ResultCard title="Distance" value={distance}>
              <GiPathDistance className="card-icon" />
            </ResultCard>
          </Grid>

          <Grid item xs={12} sm={4} sx={{ padding: 2 }}>
            <ResultCard title="CO2 per passenger" value={emissionPerPax}>
              <FaCloud className="card-icon" />
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  color: "white",
                }}
              >
                CO&#8322;
              </Typography>
            </ResultCard>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ padding: 2 }}>
            <ResultCard title="Total emissions" value={distance}>
              <ImAirplane className="card-icon" />
            </ResultCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ResultCards;
