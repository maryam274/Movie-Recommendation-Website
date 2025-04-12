import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography
      fontWeight="700"
      fontSize="1.7rem"
      component={Link} // Use Link component
      to="/" // Navigate to the home page
      sx={{
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        textDecoration: "none",
        color:
          theme.palette.mode === "light" ? "black": "white", // Change color based on theme
        "& span": {
          color: theme.palette.secondary.main, // Default color for span
        },
      }}
    >
      Popcorn<span>Time</span>Hub
    </Typography>
  );
};

export default Logo;
