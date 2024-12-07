import { Box, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import routes from "./Routes/routes";

function App() {
  return (
    <Box className="app-container">
      <CssBaseline />
      <RouterProvider router={routes} />
      <ToastContainer />
    </Box>
  );
}

export default App;
