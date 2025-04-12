// This file is responsible for configuring the TMDB API
// It exports a function that generates the base URL for the API requests
// based on the environment variables set in the .env file
// It uses the URLSearchParams API to create a query string from the parameters
// passed to the function
// It is used in the tmdb.endpoints.js file to generate the URLs for the API requests
// It is also used in the tmdb.api.js file to make the API requests
const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

// This function generates the URL for the TMDB API requests
// It takes the endpoint and parameters as arguments
// It uses the URLSearchParams API to create a query string from the parameters
// It returns the full URL for the API request
const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };