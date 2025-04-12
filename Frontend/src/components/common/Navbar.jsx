import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? theme.palette.primary.contrastText
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Navbar = () => {
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <ScrollAppBar>
        <AppBar
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            position: "fixed", // Ensure navbar stays fixed
          }}
        >
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: { xs: 56, sm: 64 }, // Mobile-friendly height
            }}
          >
            {/* Left Section - Mobile Menu & Logo */}
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{
                  display: { xs: "inline-flex", md: "none" }, // Show only on mobile
                  mr: 1,
                }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexShrink: 0 }}>
                <Logo />
              </Box>
            </Stack>

            {/* Middle Section - Navigation (Desktop only) */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" }, // Hide on mobile
                justifyContent: "center",
                alignItems: "center",
                mx: 2,
              }}
            >
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.path}
                  variant={appState === item.state ? "contained" : "text"}
                  sx={{
                    color:
                      appState === item.state
                        ? "primary.contrastText"
                        : theme.palette.text.primary,
                    mx: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.display}
                </Button>
              ))}
            </Box>

            {/* Right Section - Theme Toggle */}
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton color="inherit" onClick={onSwitchTheme} sx={{ p: 1 }}>
                {themeMode === themeModes.dark ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <WbSunnyOutlinedIcon />
                )}
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Navbar;
