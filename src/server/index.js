import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

//console.log(process.env); // Debugging: See all loaded env variables
// loads diffbot api key from .env file

// eslint-disable-next-line no-undef
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

app.get("/weather", async (req, res) => {
  try {
    //console.log("happening");
    // recieve the article URL from the client
    const lon = req.query.lon;
    const lat = req.query.lat;
    //console.log(city);
    // analyze article from the URL
    const result = await weatherRequest(lon, lat);
    //console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Picture fetch failed", message: error.message });
  }
});

app.get("/pic", async (req, res) => {
  try {
    //console.log("happening");
    // recieve the article URL from the client
    const city = req.query.query;
    //console.log(city);
    // analyze article from the URL
    const result = await pictureRequest(city);
    //console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Picture fetch failed", message: error.message });
  }
});

app.get("/city", async (req, res) => {
  try {
    //console.log("happening");
    // recieve the article URL from the client
    const city = req.query.city;
    //console.log(city);
    // analyze article from the URL
    const result = await searchRequest(city);
    //console.log(result);
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

async function weatherRequest(long, lat) {
  try {
    console.log(weatherbitAPIKey, long, lat);
    const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitAPIKey}&lon=${long}&lat=${lat}`;

    // make a GET request to pixabay
    const response = await axios.get(weatherbitUrl);

    if (response && response.data.data.length > 0) {
      const weather = response.data.data;
      //console.log(response.data.hits[0]);
      return weather;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch weather ", error.message);
  }
}

async function pictureRequest(city) {
  try {
    const pixabayUrl = `https://pixabay.com/api/?key=${pixabayAPIKey}&q=${city}&image_type=photo`;

    // make a GET request to pixabay
    const response = await axios.get(pixabayUrl);

    if (response && response.data.hits.length > 0) {
      const img = response.data.hits[0].largeImageURL;
      //console.log(response.data.hits[0]);
      return img;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch image ", error.message);
  }
}

async function searchRequest(city) {
  try {
    const geoinfoUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${geoinfoUsername}`;

    // make a GET request to diffbot
    const response = await axios.get(geoinfoUrl);

    const citiesData = response.data.geonames;
    //console.log(citiesData);
    //checks if nothing was returned
    if (!citiesData) {
      console.log("No results found");
      return {};
    }

    return citiesData;
  } catch (error) {
    console.error("Failed to search ", error.message);
  }
}
