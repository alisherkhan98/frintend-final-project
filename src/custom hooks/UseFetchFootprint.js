// react
import React from "react";
// axios
import axios from "axios";

function UseFetchFootprint(details, isFetching, setIsFetching) {
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
                departure_airport: details.departure_airport.code,
                destination_airport: details.destination_airport.code,
                cabin_class: details.cabin_class,
              },
            ],
          },
        })
        .then((response) => {
          console.log(response.data.data.attributes);
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
    setIsFetching(false);
  });
  return;
}

export default UseFetchFootprint;
