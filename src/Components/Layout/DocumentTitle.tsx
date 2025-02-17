import React, { useEffect, useState } from "react";
import { Cancel, Edit, Save } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setDocumentTitle } from "../../Redux/reducers/documentSlice";
import { errorToastMessage } from "../../utils/toast";
import http from "../../utils/http";
import socket from "../../utils/socketService";

const DocumentTitle = () => {
  const dispatch = useAppDispatch();
  const docTitle = useAppSelector((state) => state.document.title);
  const loading = useAppSelector((state) => state.document.loading);
  const authorId = useAppSelector((state) => state.document.authorId);
  const userId = useAppSelector((state) => state.user.userId);
  const { id: documentId } = useParams();

  const hasAccess = userId === authorId;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect(() => {
    setTitle(docTitle || "");
  }, [docTitle]);

  useEffect(() => {
    socket.on("titleUpdated", ({ title }) => {
      dispatch(setDocumentTitle(title));
    });

    return () => {
      socket.off("titleUpdated");
    };
  }, [dispatch]);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (hasAccess) {
      try {
        setButtonLoader(true);
        await http.patch(`/documents/${documentId}`, {
          title,
        });
        socket.emit("titleUpdate", { documentId, title });
        dispatch(setDocumentTitle(title));
        setButtonLoader(false);
        setIsEditing(false);
      } catch (err) {
        errorToastMessage(err as Error);
        setButtonLoader(false);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(docTitle);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Box
      sx={{
        justifySelf: "center",
        display: "flex",
        alignItems: "center",
        gap: 1,
        svg: {
          fontSize: "1.25rem",
        },
      }}
    >
      {!isEditing ? (
        <>
          {!loading ? (
            <>
              <Typography
                variant="h4"
                noWrap
                sx={{
                  fontWeight: 700,
                  justifySelf: "start",
                }}
              >
                {docTitle || ""}
              </Typography>
              {hasAccess && (
                <IconButton onClick={enableEditing}>
                  <Edit />
                </IconButton>
              )}
            </>
          ) : (
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", width: "150px" }}
            />
          )}
        </>
      ) : (
        <>
          <TextField
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
            slotProps={{
              htmlInput: { sx: { p: "10.5px 8px" } },
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave();
              }
            }}
          />
          <Box>
            {!buttonLoader ? (
              <>
                <IconButton onClick={handleSave}>
                  <Save />
                </IconButton>
                <IconButton onClick={handleCancel}>
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default DocumentTitle;
