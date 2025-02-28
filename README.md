# Trip Planner Project

An app that allow users to plan their trips, each trip containing multiple destinations.

The app utlizes geoinfo.org to fetch location information, pixabay.com to fetch pictures of locations, and finally weatherbit.io to fetch weather information for locations.

The geoinfo.org api returns the following:

1. Location name
2. Location Lon & Lat

The pixabay.com api returns:

1. picture image URL

The weatherbit.io returns 7 days forcast starting from the request date with the following data:

1. tempreture
2. description
3. icon

## How to run

1. add a `.env` file at the root of the project directory.

2. place the following api keys with the following format:
   `GEO_INFO_API_USERNAME=your_username`
   `PIXABAY_API_KEY=your_api_key`
   `WEATHERBIT_API_KEY=your_api_key`

3. install the dependancies using `npm install`

4. run the express server using `npm run server`

5. run the app in development mode using: `npm run dev` or production mode using: `npm run build`
