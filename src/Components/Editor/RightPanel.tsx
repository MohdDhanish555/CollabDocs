import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarGroup, Box } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

import { useAppSelector } from "../../Redux/hooks";
import socket from "../../utils/socketService";
import Comments from "./Comments";

interface User {
  id: string;
  username: string;
}

const RightPanel = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const [activeUsers, setActiveUsers] = useState<User[]>([
    { id: userId, username: "You" },
  ]);
  const { id: documentId } = useParams();

  useEffect(() => {
    socket.emit("joinRoom", { documentId, userId });

    socket.on("usersUpdated", (users) => {
      setActiveUsers(users);
    });
  }, [documentId, userId]);

  useEffect(() => {
    const leaveRoom = () => {
      socket.emit("leaveRoom", { documentId, userId });
    };

    // Handle tab/browser close
    const handleBeforeUnload = () => {
      leaveRoom();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up on component unmount
    return () => {
      leaveRoom();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [documentId, userId]);

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "450px",
        width: "350px",
        bgcolor: "#7091e6",
        borderRadius: "16px",
        p: 1.5,
      }}
    >
      <Box
        sx={{
          // bgcolor: "lightgray",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AvatarGroup max={4}>
          {activeUsers.map((user) => (
            <Avatar
              key={user?.id}
              sx={{ textTransform: "capitalize", bgcolor: deepOrange[500] }}
            >
              {user?.username?.charAt(0)}
            </Avatar>
          ))}
        </AvatarGroup>
      </Box>
      <Comments />
    </Box>
  );
};

export default RightPanel;
