import { Box } from "@mui/material";

import RightPanel from "./RightPanel";

const Editor = () => {
  return (
    <Box sx={{ height: "100%", px: 2, pb: 2, display: "flex", gap: 1 }}>
      <Box sx={{ flex: 1 }} />
      <RightPanel />
    </Box>
  );
};

export default Editor;
