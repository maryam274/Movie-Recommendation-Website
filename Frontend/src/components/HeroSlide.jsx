import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../redux/slices/globalLoadingSlice";
import { routesGen } from "../routes/routes";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import genreApi from "../api/modules/genre.api";
import mediaApi from "../api/modules/media.api";

import { Navigation, Autoplay } from "swiper"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import navigation styles
import "../style/HeroSlide.css"; // Import custom CSS for Swiper arrows

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme(); // Access theme for styling
  const dispatch = useDispatch(); // Redux dispatch function

  const [movies, setMovies] = useState([]); // State to store movies
  const [genres, setGenres] = useState([]); // State to store genres

  // Fetch genres and movies when component mounts or dependencies change
  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results); // Set movies if API call succeeds
      if (err) toast.error(err.message); // Show error if API call fails
      dispatch(setGlobalLoading(false)); // Stop global loading
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true)); // Start global loading
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres); // Set genres if API call succeeds
        getMedias(); // Fetch movies after genres are fetched
      }
      if (err) {
        toast.error(err.message); // Show error if API call fails
        setGlobalLoading(false); // Stop global loading
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.background",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode], // Gradient background
        },
      }}
    >
      {/* Swiper for sliding movies */}
      <Swiper
        modules={[Navigation, Autoplay]} // Enable navigation and autoplay
        navigation // Show navigation arrows
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
        grabCursor={true}
        loop={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            {/* Movie background image */}
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            />
            {/* Gradient overlay */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            {/* Movie details container */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              {/* Movie details */}
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "2rem",
                  color: "text.primary.main",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
                  {/* Movie title */}
                  <Typography
                    variant="h1"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left"),
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>

                  {/* Rating and genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* Movie rating */}
                    <Rating
                      value={movie.vote_average / 2} // Convert rating to 5-star scale
                      precision={0.5} // Allow half-star ratings
                      readOnly // Make rating read-only
                      sx={{
                        color: "yellow",
                      }}
                    />
                    <Divider orientation="vertical" />
                    {/* Movie genres */}
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={
                          genres.find((e) => e.id === genreId) &&
                          genres.find((e) => e.id === genreId).name
                        }
                      />
                    ))}
                  </Stack>

                  {/* Movie overview */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>

                  {/* Action buttons */}
                  <Stack direction="row" spacing={2}>
                    {/* Watch now button */}
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{ width: "max-content" }}
                    >
                      Watch Now
                    </Button>
                    {/* Explore now button */}
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{
                        width: "max-content",
                        borderRadius: "8px",
                        borderColor: "primary.main",
                        color: "white",
                      }}
                    >
                      Explore Now
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper navigation arrows */}
      <Box
        sx={{
          "& .swiper-button-next, & .swiper-button-prev": {
            color: "white", // Set arrow color to white
            opacity: 0.8, // Slight transparency
            transition: "opacity 0.3s ease", // Smooth hover effect
          },
          "& .swiper-button-next:hover, & .swiper-button-prev:hover": {
            opacity: 1, // Fully opaque on hover
          },
        }}
      />
    </Box>
  );
};

export default HeroSlide;
