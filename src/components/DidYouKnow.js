// react
import React from "react";
// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
// image
import forest from "../assets/img/forest.jpg";

function DidYouKnow() {
  const theme = useTheme();
  return (
    <Box
      sx={{ backgroundColor: "background.section", py: 5 }}
      component="section"
    >
      <Container>
        <Typography
          color="#f7f7f7"
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
        >
          Did You Know?
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={7} px={2}>
            <Typography
              variant="body1"
              color="#f7f7f7"
              mb={2}
              textAlign="justify"
            >
              A typical tree can absorb around 21 kilograms of carbon dioxide
              (CO2) per year, however this figure is only achieved when the tree
              is fully grown.
            </Typography>
            <Typography
              variant="body1"
              color="#f7f7f7"
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
              color="#f7f7f7"
              mb={2}
              textAlign="justify"
            >
              This means that we’d need to plant 40 billion trees annually to
              offset the emissions created. Even if this were possible, land
              space would be significantly reduced.
            </Typography>
            <Typography variant="body1" color="#f7f7f7" textAlign="justify">
              What can you do to help? We certainly can't do miracles but the
              least we can do is contribute with little actions that may help,
              like planting new trees. Press on the button below to start now!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            p={3}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: { xs: "250px", sm: 1 },
                maxHeight: 350,
                width: 1,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: theme.shadows[5],
              }}
            >
              <img
                src={forest}
                alt=""
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  maxHeight: "350px",
                  opacity: 0.9,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} px={2} mt={6}>
            <Button
              href="https://www.viessmann.co.uk/en/heating-advice/boilers/how-much-co2-does-tree-absorb.html"
              target="_blank"
              variant="contained"
              color="neutral"
              sx={{
                color: "icons.main",
                width: { xs: "100%", sm: "fit-content" },
                mb: { xs: 3, sm: 0 },
                borderWidth: "1px",
                borderColor: "neutral.main",
                borderStyle: "solid",
              }}
            >
              Read More
            </Button>
            <Button
              variant="outlined"
              color="hero"
              sx={{
                width: { xs: "100%", sm: "fit-content" },
                marginLeft: { sm: 3 },
              }}
            >
              Support
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DidYouKnow;
