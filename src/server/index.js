import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// eslint-disable-next-line no-undef

//load required api information from .env file
const geoinfoUsername = process.env.GEO_INFO_API_USERNAME;

const pixabayAPIKey = process.env.PIXABAY_API_KEY;

const weatherbitAPIKey = process.env.WEATHERBIT_API_KEY;
// sets the express server
const app = express();
app.use(cors());
app.use(bodyParser.json());

//console.log(__dirname);

// filler GET endpoint
app.get("/", function (req, res) {
  res.send(
    "This is the server API page, you may access its services via the client app."
  );
});

//weather route to get weather information for a location
app.get("/weather", async (req, res) => {
  try {
    const lon = req.query.lon;
    const lat = req.query.lat;
    const result = await weatherRequest(lon, lat);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Picture fetch failed", message: error.message });
  }
});

// pic route to get a picture of the current city
app.get("/pic", async (req, res) => {
  try {
    const city = req.query.query;
    const result = await pictureRequest(city);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Picture fetch failed", message: error.message });
  }
});

//city route to get cities suggestions from text
app.get("/city", async (req, res) => {
  try {
    const city = req.query.city;

    const result = await searchRequest(city);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed", message: error.message });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

// method to request 7-day weather information from lat and lon by weatherbit
async function weatherRequest(long, lat) {
  try {
    console.log(weatherbitAPIKey, long, lat);
    const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitAPIKey}&lon=${long}&lat=${lat}`;

    // make a GET request to weatherbit
    const response = await axios.get(weatherbitUrl);

    if (response && response.data.data.length > 0) {
      const weather = response.data.data;
      return weather;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch weather ", error.message);
  }
}

// method to request a picture about the selected city
async function pictureRequest(city) {
  try {
    const pixabayUrl = `https://pixabay.com/api/?key=${pixabayAPIKey}&q=${city}&image_type=photo`;

    // make a GET request to pixabay
    const response = await axios.get(pixabayUrl);

    if (response && response.data.hits.length > 0) {
      const img = response.data.hits[0].largeImageURL;
      return img;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch image ", error.message);
  }
}

// method to request cities information from text search by geonames.org
async function searchRequest(city) {
  try {
    const geoinfoUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${geoinfoUsername}`;

    const response = await axios.get(geoinfoUrl);

    const citiesData = response.data.geonames;
    if (!citiesData) {
      console.log("No results found");
      return {};
    }

    return citiesData;
  } catch (error) {
    console.error("Failed to search ", error.message);
  }
}
