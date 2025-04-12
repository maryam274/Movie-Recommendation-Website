import { useSelector } from "react-redux";
import { Paper, Box, CircularProgress, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "./Logo";


const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <Paper
      sx={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: "none",
        transition: "all .3s ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Logo />
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </Box>
    </Paper>
  );
};

export default GlobalLoading;
