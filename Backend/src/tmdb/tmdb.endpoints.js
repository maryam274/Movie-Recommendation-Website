import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  // This object contains the endpoints for the TMDB API
  // It includes the media list, media detail, media genres, media credits,
  // media videos, media images, media recommendations, media search,
  // person detail, and person media endpoints
  // Each endpoint is a function that takes parameters and returns the URL for the API request
  mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaCategory}`, { page }
  ),
  mediaDetail: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}`
  ),
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
    `genre/${mediaType}/list`
  ),
  mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/credits`
  ),
  mediaVideos: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/videos`
  ),
  mediaRecommend: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/recommendations`
  ),
  mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/images`
  ),
  mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
    `search/${mediaType}`, { query, page }
  ),
  personDetail: ({ personId }) => tmdbConfig.getUrl(
    `person/${personId}`
  ),
  personMedias: ({ personId }) => tmdbConfig.getUrl(
    `person/${personId}/combined_credits`
  ),
};

export default tmdbEndpoints;