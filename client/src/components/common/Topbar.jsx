// Import necessary libraries and components
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
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

// Component to handle AppBar behavior on scroll
const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

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
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

// Main Topbar component
const Topbar = () => {
  // Redux state selectors
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  // Local state for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Function to toggle theme mode
  const onSwithTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Sidebar component */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Scrollable AppBar */}
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Logo and menu icon on the left */}
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                color="black"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Box>
                <Logo />
              </Box>
            </Stack>

            {/* Navigation buttons in the middle */}
            <Box
              flexGrow={1}
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "white" // Highlight selected button
                      : themeMode === themeModes.dark
                      ? "white"
                      : "black", // Default color for unselected buttons
                    mr: 2,
                    backgroundColor: appState.includes(item.state)
                      ? themeMode === themeModes.dark
                        ? "primary.main"
                        : "primary.main"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: appState.includes(item.state)
                        ? "primary.dark"
                        : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
            </Box>

            {/* User menu and theme toggle on the right */}
            <Stack spacing={3} direction="row" alignItems="center">
              {/* Theme toggle button */}
              <IconButton
                sx={{
                  color: themeMode === themeModes.dark ? "white" : "black",
                }}
                onClick={onSwithTheme}
              >
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>

              {/* Sign-in button or user menu */}
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
              {user && <UserMenu />}
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
