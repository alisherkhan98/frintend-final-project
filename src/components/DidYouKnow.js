// react
import React from "react";
// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// image
import forest from "../assets/img/forest.jpg";

function DidYouKnow() {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: "primary.main", py: 5 }} component="section">
      <Container>
        <Typography
          color="text.contrast"
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
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              <Button
                href="https://www.viessmann.co.uk/en/heating-advice/boilers/how-much-co2-does-tree-absorb.html"
                variant="contained"
                color="neutral"
                sx={{
                  color: "icons.main",
                  width: { xs: "90%", sm: "fit-content" },
                  marginLeft: { xs: 2, sm: 0 },
                  m: 2,
                }}
              >
                Read More
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{
                  width: { xs: "90%", sm: "fit-content" },
                  m: 2,
                  marginLeft: { xs: 2, sm: 0 },
                }}
              >
                Support
              </Button>{" "}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} p={3}>
            <Box
              sx={{
                height: { xs: "250px", sm: 1 },

                width: 1,
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: theme.shadows[7],
              }}
            >
              <img
                src={forest}
                alt=""
                style={{
                  objectFit: "cover",
                  // maxHeight: "300px",
                  width: "100%",
                  height: "100%",
                  opacity: 0.8,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DidYouKnow;
