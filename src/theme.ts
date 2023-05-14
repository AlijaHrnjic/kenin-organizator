import { createTheme } from "@mui/material";

export const customTheme = {
  color: {
    blue: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"],
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0077b6",
    },
    secondary: {
      main: "#a3a3a3",
    },
  },
});
