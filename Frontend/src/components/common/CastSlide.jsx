import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";

const CastSlide = ({ casts }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: { xs: "50%", md: "25%", lg: "20.5%" },
        color: "primary.contrastText"
      }
    }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id)}>
              <Box sx={{
                paddingTop: "120%",
                borderRadius: "1rem 1rem 0 0",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
                transition: "all 0.3s ease-in-out",
                color: "text.primary",
                ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(cast.profile_path))
              }}>
                <Box sx={{
                  position: "absolute",
                  width: "100%",
                  height: "max-content",
                  bottom: 0,
                  padding: "10px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}>
                  <Typography sx={{...uiConfigs.style.typoLines(1, "left")}}>
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;