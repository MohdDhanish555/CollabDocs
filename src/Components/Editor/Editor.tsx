import { Box } from "@mui/material";

import RightPanel from "./RightPanel";
import LiveCursors from "./LiveCursors";
import { useState } from "react";
import SlateEditor from "./SlateEditor/SlateEditor";

export interface User {
  id: string;
  username: string;
}

const Editor = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  return (
    <Box sx={{ height: "100%", px: 2, py: 3, display: "flex", gap: 2 }}>
      <Box sx={{ flex: 1, px: 4 }}>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <SlateEditor />
        </Box>
      </Box>
      <RightPanel activeUsers={activeUsers} setActiveUsers={setActiveUsers} />
      <LiveCursors activeUsers={activeUsers} />
    </Box>
  );
};

export default Editor;
