import { Lock } from "@mui/icons-material";
import { Box, Paper, Typography, Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../Redux/hooks";

const RequestAccess = () => {
  const user = useAppSelector((state) => state.user.userName);

  return (
    <Box
      sx={{
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Lock fontSize="large" sx={{ mb: 4 }} />
        <Typography variant="h6">Request access to this file</Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 6 }}>
          you can view this file once your request is approved
        </Typography>
        <Button fullWidth variant="contained" color="primary">
          Request Access
        </Button>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          You are logged in as{" "}
          <Typography
            variant="body1"
            color="textPrimary"
            sx={{ textTransform: "capitalize" }}
            component="span"
          >
            {user}
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RequestAccess;
