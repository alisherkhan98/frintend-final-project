// react
import React from "react";
// axios
import axios from "axios";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  setFlightDetails,
  setIsFetchingFootprint,
} from "../redux/features/flightDataSlice";

function UseFetchFootprint(details) {
  const dispatch = useDispatch();
  const { isFetchingFootprint } = useSelector((state) => state.flightData);
  React.useEffect(() => {
    if (isFetchingFootprint) {
      const legs = [
        {
          departure_airport: details?.departureAirport?.code,
          destination_airport: details?.destinationAirport?.code,
          cabin_class: details?.cabinClass,
        },
      ];

      // adding return leg if round trip
      if (details.roundTrip === "round_trip") {
        legs.push({
          departure_airport: details?.destinationAirport?.code,
          destination_airport: details?.departureAirport?.code,
          cabin_class: details?.cabinClass,
        });
      }
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
            legs,
          },
        })
        .then((response) => {
          // save data in redux state
          const responseDetails = response.data.data.attributes;
          dispatch(setFlightDetails(responseDetails));
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
    }
    dispatch(setIsFetchingFootprint(false));
  }, [isFetchingFootprint]);
  return;
}

export default UseFetchFootprint;
