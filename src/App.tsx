import { Box, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router";

import routes from "./Routes/routes";

function App() {
  return (
    <Box className="app-container">
      <CssBaseline />
      <RouterProvider router={routes} />
    </Box>
  );
}

export default App;
