// const API_KEY = "YOUR_API_KEY_HERE"; // If only you have google map api key

import axios from "axios";
import HttpError from "../models/http-error.js";

async function getCoordinatesForAddress(address) {
  // if not google map api key, return dummy coordinates
  return {
    lat: 40.7484474,
    lng: -73.9871516,
  };

  // const response = await axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     address
  //   )}&key=${API_KEY}`
  // );

  // const data = response.data;

  // if (!data || data.status === "ZERO_RESULTS") {
  //   const error = new HttpError(
  //     "Could not find location for the specified address.",
  //     422
  //   );
  //   throw error;
  // }

  // const coordinates = data.results[0].geometry.location;

  // return coordinates;
}

export default getCoordinatesForAddress;
