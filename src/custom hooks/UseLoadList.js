// react
import React from "react";
// axios
import axios from "axios";

const options = {
  method: "GET",
  url: "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json",
};

function UseLoadList() {
  const [airportsList, setAirportsList] = React.useState([]);

  // useEffect to fetch all the Iata codes
  React.useEffect(() => {
    axios
      .request(options)
      .then((res) =>
        res.data.map((item) => {
          // creating the strings displayed in the autocomplete inputs
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
            name: item.name,
            city: item.city,
          };
          return obj;
        })
      )
      .then((res) => {
        setAirportsList(res);
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

          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, []);
  return airportsList;
}

export default UseLoadList;
