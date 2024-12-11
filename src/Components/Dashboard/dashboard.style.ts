import { SxProps } from "@mui/material";

export const DocumentsWrapper: SxProps = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  height: "calc(100% - 70px)",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": { width: 0, height: 0 },
};

export const EmptyDataContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  py: 4,
};
