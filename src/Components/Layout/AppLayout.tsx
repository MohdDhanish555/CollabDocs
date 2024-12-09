import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Box, Stack } from "@mui/material";

const AppLayout = () => {
  return (
    <Stack sx={{ height: "100%" }}>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AppLayout;
