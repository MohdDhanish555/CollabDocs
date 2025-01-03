import { Box, styled } from "@mui/material";

export const StyledToolbar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  marginBottom: "8px",
}));
