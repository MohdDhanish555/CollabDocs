import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import http from "../../utils/http";
import { AxiosResponse } from "axios";
import { errorToastMessage } from "../../utils/toast";

const DocumentHeader = () => {
  const navigate = useNavigate();

  const handleStartButton = async () => {
    try {
      const res: AxiosResponse = await http.post("/documents/create");
      navigate(`/document/${res.data?.data?.id}`);
    } catch (error) {
      errorToastMessage(error as Error);
    }
  };

  return (
    <Box
      sx={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        pt: 2,
        pb: 4,
      }}
    >
      <Typography variant="h2">All documents</Typography>
      <Box sx={{ ml: "auto" }}>
        <Button
          onClick={handleStartButton}
          startIcon={<Add />}
          variant="contained"
          color="secondary"
        >
          Start a blank document
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentHeader;
