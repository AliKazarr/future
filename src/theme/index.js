import { createTheme } from "@mui/material/styles";

export const futuristicTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00f2ff", // Neon Mavi
    },
    secondary: {
      main: "#bc13fe", // Neon Mor
    },
    background: {
      default: "#050505",
      paper: "#111111",
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
  },
});
