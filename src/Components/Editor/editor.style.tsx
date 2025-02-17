import { alpha, Box, InputBase, styled } from "@mui/material";

export const StyledToolbar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  marginBottom: "8px",
}));

export const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  borderRadius: "8px",
  backgroundColor: alpha("#27344D", 0.55),
  "&:hover": {
    backgroundColor: alpha("#27344D", 0.65),
  },
  width: "100%",
  height: "50px",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "50px",
  width: "100%",
  borderRadius: "8px",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: "120px",
  },
}));

export const StyledSelectInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  top: 5,
  right: 5,
  height: "40px",
  borderRadius: "8px",

  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 0, 0, 1.5),
    width: "65px",
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));
