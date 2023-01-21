// axios
import axios from "axios";

// loader function
export default async function listLoader() {
  try {
    let data = await axios.get(
      "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json"
    );
    return data.data
      .filter((item) => item.type === "Airports") //filtering only airports
      .map((item) => {
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
      });
  } catch (error) {
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
  }
}
