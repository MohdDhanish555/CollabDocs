import { SxProps } from "@mui/material";

export const FullScreenContainer: SxProps = {
  height: "100%",
  width: "100%",
};

export const FullScreenCenteredContainer: SxProps = {
  ...FullScreenContainer,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
