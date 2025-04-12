//what is axios? axios is a promise-based HTTP client for the browser and Node.js
//what is axios used for? axios is used to make HTTP requests from the browser or Node.js
//what is the difference between axios and fetch? axios is a library that is built on top of the fetch API, it has a simpler API and supports older browsers
import axios from "axios";



// Axios Client 
const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity"
    }
  });
  return response.data;
};

export default { get };