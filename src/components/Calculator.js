// react
import React, { useRef } from "react";
// MUI
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Select,
  MenuItem,
  Stack,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
// custom hooks
import UseLoadList from "../custom-hooks/UseLoadList";
import UseFetchFootprint from "../custom-hooks/UseFetchFootprint";
// redux
import { useDispatch } from "react-redux";
import { setIsFetchingFootprint } from "../redux/features/flightDataSlice";
// icons
import { TbHelp } from "react-icons/tb";

function Calculator() {
  const dispatch = useDispatch();
  // useRef fo scrolling down if emissions are calculated (passed as prop to useFetchFootprint)
  const calculatorRef = useRef(null);
  // autocomplete inputs
  const [isDepartureOpen, setIsDepartureOpen] = React.useState(false);
  const [isDestinationOpen, setisDestinationOpen] = React.useState(false);
  // error handling
  const [formError, setFormError] = React.useState({
    passengers: false,
    departure: false,
    destination: false,
  });

  // state for controlled components
  const [details, setDetails] = React.useState({
    departureAirport: null,
    destinationAirport: null,
    cabinClass: "economy",
    roundTrip: "one_way",
    passengers: 1,
  });
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  // load airports list with api call
  const airportsList = UseLoadList();

  // fetch carbon emission data
  UseFetchFootprint(details, calculatorRef);

  // function to handle changes of inputs
  function handleChange(e) {
    const target = e.target;
    setDetails((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }
  // function to handle submit
  function handleSubmit(e) {
    e.preventDefault();
    // temporary error variable
    let error = false;
    //client side error handling
    if (isNaN(+details.passengers) || +details.passengers < 1) {
      setFormError((prev) => ({
        ...prev,
        passengers: true,
      }));
      error = true;
    } else {
      setFormError((prev) => ({
        ...prev,
        passengers: false,
      }));
    }
    if (details.departureAirport === null) {
      setFormError((prev) => ({
        ...prev,
        departure: true,
      }));
      error = true;
    } else {
      setFormError((prev) => ({
        ...prev,
        departure: false,
      }));
    }
    if (details.destinationAirport === null) {
      setFormError((prev) => ({
        ...prev,
        destination: true,
      }));
      error = true;
    } else {
      setFormError((prev) => ({
        ...prev,
        destination: false,
      }));
    }
    if (error) {
      return;
    }

    dispatch(setIsFetchingFootprint(true));
  }

  return (
    <Box sx={{ backgroundColor: "neutral.main", py: 8 }} ref={calculatorRef}>
      <Container>
        <Paper
          component="form"
          sx={{
            padding: " 40px 32px",
            borderRadius: 5,
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h6" mb={5}>
            Enter details of your flight
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={3}
            mb={3}
            alignItems="flex-start"
          >
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
              value={details.cabinClass}
              name="cabinClass"
              onChange={handleChange}
              sx={{ minWidth: "120px", width: "30%", maxWidth: "250px" }}
            >
              <MenuItem value={"economy"}>Economy</MenuItem>
              <MenuItem value={"premium"}>First class</MenuItem>
            </Select>

            {/* passengers */}

            <TextField
              sx={{ minWidth: "120px", width: "30%", maxWidth: "250px" }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="The average aircraft has 138 seats"
                      open={tooltipOpen}
                    >
                      <IconButton
                        onClick={() => {
                          setTooltipOpen(true);
                          setTimeout(() => {
                            setTooltipOpen(false);
                          }, 2000);
                        }}
                      >
                        <TbHelp size="1.2rem" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={details.passengers}
              name="passengers"
              onChange={handleChange}
              label="Passengers"
              // in case of error
              error={formError.passengers}
              helperText={formError.passengers && "Please enter a number > 0"}
            />
          </Stack>

          <Stack sx={{ flexDirection: { sm: "row" } }} gap={3} mb={5}>
            {/* Departure */}
            <Autocomplete
              disablePortal
              options={airportsList}
              getOptionLabel={(option) => option && option.label}
              sx={{ width: "100%" }}
              // open component only if you typed three letters
              open={isDepartureOpen}
              onClose={() => setIsDepartureOpen(false)}
              onInputChange={(e, value) => {
                if (value.length > 2) {
                  setIsDepartureOpen(true);
                } else setIsDepartureOpen(false);
              }}
              // controlled component
              value={details.departureAirport}
              onChange={(e, newValue) => {
                setDetails((prev) => ({
                  ...prev,
                  departureAirport: newValue,
                }));
              }}
              // input render
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Departure"
                  placeholder="Enter at least 3 letters"
                  // in case of error
                  error={formError.departure}
                  helperText={
                    formError.departure && "Please select a departure airport"
                  }
                />
              )}
            />

            {/* Destination */}
            <Autocomplete
              disablePortal
              options={airportsList}
              getOptionLabel={(option) => option && option.label}
              sx={{ width: "100%" }}
              // open component only if you typed three letters
              open={isDestinationOpen}
              onClose={() => setisDestinationOpen(false)}
              onInputChange={(e, value) => {
                if (value.length > 2) {
                  setisDestinationOpen(true);
                } else setisDestinationOpen(false);
              }}
              // controlled component
              value={details.destinationAirport}
              onChange={(e, newValue) => {
                setDetails((prev) => ({
                  ...prev,
                  destinationAirport: newValue,
                }));
              }}
              // input render
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  name="destination"
                  placeholder="Enter at least 3 letters"
                  // in case of error
                  error={formError.destination}
                  helperText={
                    formError.destination &&
                    "Please select a destination airport"
                  }
                />
              )}
            />
          </Stack>
          <Stack sx={{ alignItems: { xs: "center", sm: "flex-end" } }}>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
            >
              Calculate my footprint
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Calculator;
