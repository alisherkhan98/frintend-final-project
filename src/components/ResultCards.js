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
import { GiPathDistance, GiPineTree } from "react-icons/gi";
import { FaCloud } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";
import { VscPerson } from "react-icons/vsc";

// components
import ResultCard from "./ResultCard";

function ResultCards() {
  const theme = useTheme();
  const { footprintDetails } = useSelector((state) => state.flightData);

  // stringified data
  const distance = Math.round(footprintDetails.distance_value) + " km";
  const emissionPerPax =
    Math.round(footprintDetails.carbon_kg / footprintDetails.passengers) +
    " kg";
  const totalEmissions = Math.round(footprintDetails.carbon_kg) + " kg";
  const trees = Math.round(footprintDetails.carbon_kg / 21) + " trees";
  return (
    <Box sx={{ backgroundColor: "neutral.main" }}>
      <Container>
        <Typography
          color="primary"
          variant="h4"
          textAlign="center"
          fontWeight={700}
          py={3}
        >
          Your Emissions
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={4} sx={{ padding: 2 }}>
            <ResultCard title="Distance" value={distance} timeout={500}>
              <GiPathDistance className="card-icon" />
            </ResultCard>
          </Grid>

          <Grid item xs={10} sm={4} sx={{ padding: 2 }}>
            <ResultCard
              title="CO&#8322; per passenger"
              value={emissionPerPax}
              timeout={750}
            >
              <VscPerson className="card-icon" />
            </ResultCard>
          </Grid>

          <Grid item xs={10} sm={4} sx={{ padding: 2 }}>
            <ResultCard
              title="Total emissions"
              value={totalEmissions}
              timeout={1000}
            >
              <FaCloud className="card-icon" />
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  color: "background.paper",
                }}
              >
                CO&#8322;
              </Typography>
            </ResultCard>
          </Grid>

          <Grid item xs={10} sm={4} sx={{ padding: 2 }}>
            <ResultCard
              title={
                <span>
                  Trees to absorb <strong>{totalEmissions} of CO&#8322;</strong>{" "}
                  in one year
                </span>
              }
              value={trees}
              timeout={1250}
            >
              <GiPineTree className="card-icon" />
            </ResultCard>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box width="33%" padding={2}>
           
          </Box>
        </Box> */}
      </Container>
    </Box>
  );
}

export default ResultCards;
