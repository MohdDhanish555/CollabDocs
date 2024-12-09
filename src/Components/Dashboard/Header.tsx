import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const DocumentHeader = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography variant="h2">All documents</Typography>
      <Box sx={{ ml: "auto" }}>
        <Button startIcon={<Add />} variant="contained" color="secondary">
          Start a blank document
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentHeader;
