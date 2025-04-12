import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";


// Media Controller 
// This controller handles the media list requests
// It takes the media type and media category from the request parameters
// and the page number from the request query
// It then calls the tmdbApi.mediaList function to get the media list
// and returns the response to the client
// It also handles errors by returning an error response to the client
// The media type can be one of the following: movie, tv, person
// The media category can be one of the following: popular, top_rated, upcoming, now_playing, on_the_air, airing_today
const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

// This controller handles the media genres requests
// It takes the media type from the request parameters
// and calls the tmdbApi.mediaGenres function to get the media genres
const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
// The media type can be one of the following: movie, tv
    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

// This controller handles the media search requests
// It takes the media type from the request parameters
// and the search query and page number from the request query
// It then calls the tmdbApi.mediaSearch function to get the search results
// and returns the response to the client
// The media type can be one of the following: movie, tv, person
const search = async (req, res) => {
  try {
    const { mediaType } = req.params; 
    const { query, page } = req.query; //what's query? query is the search term that the user wants to search for
    // The media type can be one of the following: movie, tv, person
    // The page number is used for pagination, it indicates which page of results to return

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

// Media Detail Controller
const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    // The media type can be one of the following: movie, tv
    // The media ID is the unique identifier for the media item
    // It is used to get the details of the specific media item
    // The params object contains the media type and media ID
    // It is passed to the tmdbApi.mediaDetail function to get the media details
    // The mediaDetail function returns the details of the specific media item
    
    const media = await tmdbApi.mediaDetail(params);
    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    return responseHandler.ok(res, media);
  } catch (e) {
    responseHandler.error(res, e);
  }
};

export default { getList, getGenres, search, getDetail };