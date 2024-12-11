import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";

import http from "../../utils/http";
import { errorToastMessage } from "../../utils/toast";

const DocumentHeader = () => {
  const navigate = useNavigate();
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleStartButton = async () => {
    try {
      setButtonLoader(true);
      const res: AxiosResponse = await http.post("/documents/create");
      setButtonLoader(false);
      navigate(`/document/${res.data?.data?.id}`);
    } catch (error) {
      errorToastMessage(error as Error);
      setButtonLoader(false);
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
          startIcon={
            buttonLoader ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <Add />
            )
          }
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
