import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Outfit, Arial, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: { fontSize: "2.5rem", fontWeight: 700 }, // 40px
    h2: { fontSize: "2rem", fontWeight: 600 }, // 32px
    h3: { fontSize: "1.75rem", fontWeight: 500 }, // 28px
    h4: { fontSize: "1.5rem", fontWeight: 500 }, // 24px
    body1: { fontSize: "1rem", fontWeight: 400 }, // 16px
    body2: { fontSize: "0.875rem", fontWeight: 400 }, // 14px
    subtitle1: { fontSize: "1.25rem", fontWeight: 500 }, // 20px
    subtitle2: { fontSize: "1.125rem", fontWeight: 500 }, // 18px
  },
  palette: {
    primary: { main: "#3371FF" },
    secondary: { main: "#151E2F" },
    error: { main: "#f44336" },
    warning: { main: "#ff9800" },
    info: { main: "#2196f3" },
    success: { main: "#4caf50" },
    background: { default: "#09111F", paper: "#0B1527" },
    text: { primary: "#fff", secondary: "#B4C6EE", disabled: "#9e9e9e" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fieldset: {
            border: "1px solid #2E3D5B",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});
