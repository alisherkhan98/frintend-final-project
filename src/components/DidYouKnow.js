// react
import React from "react";
// MUI
import { Box, Container, Grid, Typography } from "@mui/material";
// image
import forest from "../assets/img/forest.jpg";

function DidYouKnow() {
  return (
    <Box sx={{ backgroundColor: "primary.main", py: 5 }}>
      <Container>
        <Typography
          color="text.contrast"
          variant="h4"
          textAlign="center"
          fontWeight={700}
          pb={3}
        >
          Did You Know?
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={7} px={2}>
            <Typography
              variant="body1"
              color="text.contrast"
              mb={2}
              textAlign="justify"
            >
              A typical tree can absorb around 21 kilograms of carbon dioxide
              (CO2) per year, however this figure is only achieved when the tree
              is fully grown.
            </Typography>
            <Typography
              variant="body1"
              color="text.contrast"
              mb={2}
              textAlign="justify"
            >
              Over a lifetime of 100 years, one tree could absorb around a tonne
              of CO2. While this seems like a significant amount, humans are
              creating about{" "}
              <strong>40 billions tonnes of CO2 each year</strong>.
            </Typography>
            <Typography
              variant="body1"
              color="text.contrast"
              mb={2}
              textAlign="justify"
            >
              This means that we’d need to plant 40 billion trees annually to
              offset the emissions created. Even if this were possible, land
              space would be significantly reduced.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} p={3}>
            <Box
              sx={{
                backgroundImage: `url(${forest})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DidYouKnow;
