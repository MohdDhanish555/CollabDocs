import React, { useEffect, useState } from "react";
import socket from "../../utils/socketService";
import { useAppSelector } from "../../Redux/hooks";
import { useParams } from "react-router";
import { Avatar, Box } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const LiveCursors = ({ activeUsers }: any) => {
  const userId = useAppSelector((state) => state.user.userId);
  const { id: documentId } = useParams();
  const [userCursors, setUserCursors] = useState({});

  useEffect(() => {
    socket.on("updateCursor", ({ userId, position }) => {
      setUserCursors((prev) => ({
        ...prev,
        [userId]: position,
      }));
    });

    socket.on("userDisconnected", ({ userId }) => {
      setUserCursors((prev) => {
        const updated: any = { ...prev };
        if (updated[userId]) {
          delete updated[userId];
        }

        return updated;
      });
    });

    return () => {
      socket.off("updateCursor");
      socket.off("userDisconnected");
    };
  }, []);

  useEffect(() => {
    let lastPosition: any = null;

    const handleMouseMove = (e: any) => {
      const position = { x: e.clientX, y: e.clientY };
      if (
        !lastPosition ||
        position.x !== lastPosition.x ||
        position.y !== lastPosition.y
      ) {
        lastPosition = position;
        socket.emit("cursorMoved", { documentId, userId, position });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [documentId, userId]);

  return (
    <>
      {Object.entries(userCursors).map(([id, position]: any) => (
        <Box
          key={id}
          sx={{
            position: "fixed",
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "10px solid #FF5722", // Customize color for the pointer
              top: "10px",
              right: "3px",
            }}
          />
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: deepOrange[500],
              fontSize: "12px",
              textTransform: "uppercase",
              top: "20px",
              left: "12px",
            }}
          >
            {activeUsers
              .find((user: any) => user.id === id)
              ?.username.charAt(0)}
          </Avatar>
        </Box>
      ))}
    </>
  );
};

export default LiveCursors;
