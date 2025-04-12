import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


// Menu configuration

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie"
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv"
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  }
];

const menuConfigs = { main };

export default menuConfigs;