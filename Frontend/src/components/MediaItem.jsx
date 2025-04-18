import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import { routesGen } from "../routes/routes";
import { Rating } from "@mui/material";

// media item
const MediaItem = ({ media, mediaType }) => {
  // states
  const [title, setTitle] = useState(""); // media title
  const [posterPath, setPosterPath] = useState(""); // media poster
  const [releaseDate, setReleaseDate] = useState(null); // media release date
  const [rate, setRate] = useState(null);

  // useEffect hooks
  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    // media item
    <Box
      sx={{
        margin: "1rem", // Add gap between items
      }}
    >
      <Link
        to={
          mediaType !== "people"
            ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
            : routesGen.person(media.id)
        }
      >
        <Box
          sx={{
            ...uiConfigs.style.backgroundImage(posterPath),
            paddingTop: "160%",
            borderRadius: "1rem",
            overflow: "hidden",
            "&:hover .media-info": { opacity: 1, bottom: 0 },
            "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
            color: "primary.contrastText",
          }}
        >
          {/* movie or tv item */}
          {mediaType !== "people" && (
            <>
              <Box
                className="media-back-drop"
                sx={{
                  opacity: { xs: 1, md: 0 },
                  transition: "all 0.3s ease",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
                }}
              />
              <Button
                className="media-play-btn"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  display: { xs: "none", md: "flex" },
                  opacity: 0,
                  transition: "all 0.3s ease",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  "& .MuiButton-startIcon": { marginRight: "-4px" },
                }}
              />
              <Box
                className="media-info"
                sx={{
                  transition: "all 0.3s ease",
                  opacity: { xs: 1, md: 0 },
                  position: "absolute",
                  bottom: { xs: 0, md: "-20px" },
                  width: "100%",
                  height: "max-content",
                  boxSizing: "border-box",
                  padding: { xs: "1rem", md: "2rem 1rem" },
                }}
              >
                <Stack spacing={{ xs: 1, md: 2 }}>
                  {rate && (
                    <Rating
                      value={rate / 2}
                      precision={0.5}
                      readOnly
                      sx={{
                        color: "yellow",
                      }}
                    />
                  )}

                  <Typography>{releaseDate}</Typography>

                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{
                      fontSize: "1rem",
                      ...uiConfigs.style.typoLines(1, "left"),
                    }}
                  >
                    {title}
                  </Typography>
                </Stack>
              </Box>
            </>
          )}
          {/* movie or tv item */}

          {/* people */}
          {mediaType === "people" && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: 0,
                padding: "1rem",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                {media.name}
              </Typography>
            </Box>
          )}
          {/* people */}
        </Box>
      </Link>
    </Box>
  );
};

export default MediaItem;
