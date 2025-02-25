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

// POST Route
app.post("/api", async (req, res) => {
  try {
    // recieve the article URL from the client
    const url = req.body.url;
    console.log(url);
    // analyze article from the URL
    const result = await nlpRequest(url);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed", message: error.message });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

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

// Function to analyze article via diffbot
async function nlpRequest(url) {
  try {
    // make a GET request to diffbot
    const response = await axios.get(`${diffbotUrl}${url}`);
    const analysisResult = {};
    const articleData = response.data.objects[0];

    //checks if nothing was returned
    if (!articleData) {
      console.log("No article data found for the given URL.");
      return {};
    }

    // saves sentiment
    analysisResult["sentiment"] = convertSentiment(
      response.data.objects[0].sentiment
    );

    // saves sentiment Percentage
    analysisResult["sentimentPercent"] =
      calculateConfidence(response.data.objects[0].sentiment).toFixed(1) + " %";

    // saves title
    analysisResult["title"] = response.data.objects[0].title;

    // saves category
    analysisResult["category"] = response.data.objects[0].categories[0].name;

    // saves category score
    analysisResult["categoryPercent"] =
      (response.data.objects[0].categories[0].score * 100).toFixed(1) + " %";

    // saves article text
    analysisResult["text"] =
      extractFirstNWords(response.data.objects[0].text, 90) + "...";

    return analysisResult;
  } catch (error) {
    console.error("Error fetching or analyzing the article:", error.message);
  }
}

// converts sentiment value to a label
const convertSentiment = (sentiment) => {
  if (sentiment < -0.6) {
    return "Negative";
  } else if (sentiment >= -0.6 && sentiment <= 0.6) {
    return "Neutral";
  } else if (sentiment > 0.6) {
    return "Positive";
  } else {
    return "Unknown";
  }
};

// Function that takes the first N words from the article text
function extractFirstNWords(text, n) {
  const words = text.split(/\s+/);
  return words.slice(0, n).join(" ");
}

//function that takes the sentiment and converts it to a percentage of confidence
function calculateConfidence(rating) {
  rating = Math.max(-1, Math.min(1, rating));
  const naturalBoundary = 0.6;
  if (rating > naturalBoundary) {
    return ((rating - naturalBoundary) / (1 - naturalBoundary)) * 100;
  } else if (rating < -naturalBoundary) {
    return ((Math.abs(rating) - naturalBoundary) / (1 - naturalBoundary)) * 100;
  } else {
    return (1 - Math.abs(rating) / naturalBoundary) * 100;
  }
}
