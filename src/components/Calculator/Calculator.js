// react
import React from "react";
// MUI
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import axios from "axios";
import UseLoadList from "../../custom hooks/UseLoadList";
import UseFetchFootprint from "../../custom hooks/UseFetchFootprint";

function Calculator() {
  // states
  const [isFetching, setIsFetching] = React.useState(false);
  // autocomplete inputs
  const [isFromOpen, setIsFromOpen] = React.useState(false);
  const [isToOpen, setIsToOpen] = React.useState(false);

  // controlled components
  const [details, setDetails] = React.useState({
    departure_airport: null,
    destination_airport: null,
    cabin_class: "economy",
    roundTrip: "one_way",
    passengers: 1,
  });

  // load airports list with api call
  const airportsList = UseLoadList();

  // fetch carbon emission data
  UseFetchFootprint(details, isFetching, setIsFetching);

  // function to handle changes of inputs
  function handleChange(e) {
    const target = e.target;
    setDetails((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  return (
    <Container>
      <Box component="form" py={3}>
        <Paper
          sx={{
            padding: " 40px 32px",
            borderRadius: 5,
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h6" mb={5}>
            Enter details of your flight
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={3} mb={3}>
            {/* select if return or one way */}
            <Select
              value={details.roundTrip}
              name="roundTrip"
              onChange={handleChange}
              sx={{ minWidth: "120px", width: "30%", maxWidth: "250px" }}
            >
              <MenuItem value={"one_way"}>One way</MenuItem>
              <MenuItem value={"round_trip"}>Round trip</MenuItem>
            </Select>

            {/* select class */}
            <Select
              value={details.cabin_class}
              name="cabin_class"
              onChange={handleChange}
              sx={{ minWidth: "120px", width: "30%", maxWidth: "250px" }}
            >
              <MenuItem value={"economy"}>Economy</MenuItem>
              <MenuItem value={"premium"}>First class</MenuItem>
            </Select>

            {/* passengers */}
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={details.passengers}
              name="passengers"
              onChange={handleChange}
              label="Passengers"
              sx={{ minWidth: "120px", width: "30%", maxWidth: "250px" }}
            />
          </Stack>

          <Stack sx={{ flexDirection: { sm: "row" } }} gap={3} mb={5}>
            {/* from */}
            <Autocomplete
              disablePortal
              value={details.departure_airport}
              options={airportsList}
              getOptionLabel={(option) => option && option.label}
              sx={{ width: "100%" }}
              // open component only if you typed three letters
              open={isFromOpen}
              onClose={() => setIsFromOpen(false)}
              onInputChange={(e, value) => {
                if (value.length > 2) {
                  setIsFromOpen(true);
                } else setIsFromOpen(false);
              }}
              onChange={(e, newValue) => {
                setDetails((prev) => ({
                  ...prev,
                  departure_airport: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Departure"
                  placeholder="Enter at least 3 letters"
                />
              )}
            />

            {/* to */}
            <Autocomplete
              disablePortal
              value={details.destination_airport}
              options={airportsList}
              getOptionLabel={(option) => option && option.label}
              sx={{ width: "100%" }}
              // open component only if you typed three letters
              open={isToOpen}
              onClose={() => setIsToOpen(false)}
              onInputChange={(e, value) => {
                if (value.length > 2) {
                  setIsToOpen(true);
                } else setIsToOpen(false);
              }}
              onChange={(e, newValue) => {
                setDetails((prev) => ({
                  ...prev,
                  destination_airport: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  name="destination"
                  placeholder="Enter at least 3 letters"
                />
              )}
            />
          </Stack>
          <Stack sx={{ alignItems: { xs: "center", sm: "flex-end" } }}>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setIsFetching(true);
              }}
            >
              Calculate my footprint
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default Calculator;
