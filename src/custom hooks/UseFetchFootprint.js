// react
import React from "react";
// axios
import axios from "axios";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  removeError,
  setError,
  setFlightDetails,
  setIsFetchingFootprint,
} from "../redux/features/flightDataSlice";

function UseFetchFootprint(details, calculatorRef) {
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
            Authorization: "Bearer M0XbSRtXiAfnQ4c1jAvCQ",
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
            if (error.response.status === 404) {
              dispatch(
                setError({
                  message: "Page not found",
                  status: error.response.status,
                })
              );
            } else if (error.response.status === 401) {
              dispatch(
                setError({
                  message: "API Key not valid. Try with a different key",
                  status: error.response.status,
                })
              );
            } else {
              dispatch(
                setError({
                  message: error.response.data.message,
                  status: error.response.status,
                })
              );
            }
          } else if (error.request) {
            // The request was made but no response was received
            dispatch(
              setError({
                message: "The request was made but no response was received",
                status: "unknown",
              })
            );
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(
              setError({
                message: error.message,
                status: "unknown",
              })
            );
          }
          dispatch(setFlightDetails(undefined));
        })
        .then((res) => {
          window.scrollTo({
            top:
              window.pageYOffset +
              calculatorRef.current.getBoundingClientRect().bottom -
              60,
            behavior: "smooth",
          });
        });
    }
    dispatch(setIsFetchingFootprint(false));
  }, [isFetchingFootprint]);
  return;
}

export default UseFetchFootprint;
