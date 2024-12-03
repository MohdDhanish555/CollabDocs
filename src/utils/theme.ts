import { createTheme } from "@mui/material";

export const theme = createTheme({
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "Montserrat, serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    body1: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "150%",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "150%",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 18,
      lineHeight: "150%",
    },
    h2: {
      fontWeight: 700,
      fontSize: 30,
      lineHeight: "150%",
    },
    h6: {
      fontWeight: 500,
      fontSize: 20,
      lineHeight: "150%",
    },
  },
  palette: {
    primary: {
      main: "#181C62",
    },
    secondary: {
      main: "#D71440",
    },
    text: {
      primary: "#111928",
    },
    divider: "#e5e7eb",
  },
});
