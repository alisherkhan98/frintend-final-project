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

const options = {
  method: "GET",
  url: "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json",
};

function Calculator() {
  // states
  const [isFetching, setIsFetching] = React.useState(false);
  const [airportsList, setAirportsList] = React.useState([]);
  // autocomplete inputs
  const [isFromOpen, setIsFromOpen] = React.useState(false);
  const [isToOpen, setIsToOpen] = React.useState(false);
  // controlled components
  const [details, setDetails] = React.useState({
    departure_airport: "",
    destination_airport: "",
    cabin_class: "economy",
    roundTrip: "one_way",
    passengers: 1,
  });
  console.log(details);

  // function to handle changes of inputs
  function handleChange(e) {
    const target = e.target;
    setDetails((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }
  // useEffect to fetch all the Iata codes
  React.useEffect(() => {
    axios
      .request(options)
      .then((res) =>
        res.data.map((item) => {
          const string =
            item?.name +
            ", " +
            item?.city +
            ", " +
            item?.state +
            ", " +
            item?.country +
            " (" +
            item?.code +
            ")";

          const obj = {
            label: string,
            code: item.code,
          };
          return obj;
        })
      )
      .then((res) => {
        setAirportsList(res);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  // UseEffect to make api call to calculate distance and co2 emission in kg
  React.useEffect(() => {
    if (isFetching) {
      axios
        .request({
          url: "https://www.carboninterface.com/api/v1/estimates",
          method: "POST",
          headers: {
            Authorization: "Bearer yUP5UARh3BLQQRlDtgvA2w",
            "Content-Type": "application/json",
          },
          data: {
            type: "flight",
            passengers: details.passengers,
            legs: [
              {
                departure_airport: details.departure_airport,
                destination_airport: details.destination_airport,
                cabin_class: details.cabin_class,
              },
            ],
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      setIsFetching(false);
    }
  }, [isFetching]);
  return (
    <Container>
      <Box component="form" py={3}>
        <Paper
          sx={{
            padding: { xs: 3, sm: 5 },
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
              sx={{ minWidth: "120px", width: "30%" }}
            >
              <MenuItem value={"one_way"}>One way</MenuItem>
              <MenuItem value={"return"}>Return</MenuItem>
            </Select>

            {/* select class */}
            <Select
              value={details.cabin_class}
              name="cabin_class"
              onChange={handleChange}
              sx={{ minWidth: "120px", width: "30%" }}
            >
              <MenuItem value={"economy"}>Economy</MenuItem>
              <MenuItem value={"first class"}>First class</MenuItem>
            </Select>

            {/* passengers */}
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={details.passengers}
              name="passengers"
              onChange={handleChange}
              label="Passengers"
              sx={{ minWidth: "120px", width: "30%" }}
            />
          </Stack>

          <Stack sx={{ flexDirection: { sm: "row" } }} gap={3} mb={5}>
            {/* from */}
            <Autocomplete
              disablePortal
              options={airportsList}
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
                  departure_airport: newValue ? newValue?.code : "",
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
              options={airportsList}
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
                  destination_airport: newValue ? newValue?.code : "",
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
