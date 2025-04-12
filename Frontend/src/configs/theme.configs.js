import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light"
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette = mode === themeModes.dark ? {
      primary: {
        main: "#3C00FFFF",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#321DECFF",
        contrastText: "#ffffff"
      },
      background: {
        default: "#181818FF",
        paper: "#131313"
      }
    } : {
      primary: {
        main: "#3C00FFFF"
      },
      secondary: {
        main: "#321DECFF"
      },
      background: {
        default: colors.grey["100"],
      }
    };

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true }
        }
      }
    });
  }
};

export default themeConfigs;