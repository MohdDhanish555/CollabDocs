import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useParams } from "react-router";

import { errorToastMessage } from "../../utils/toast";
import http from "../../utils/http";
import socket from "../../utils/socketService";
import { useAppSelector } from "../../Redux/hooks";
import { SendIcon } from "../Common/UI/Icons";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { RoundedButtonStyle } from "../Common/UI/IconButton";
import { DateTime } from "luxon";

type CommentType = {
  id: string;
  comment: string;
  time: string;
  user: string;
};

const Comments = () => {
  const { id: documentId } = useParams();
  const userId = useAppSelector((state) => state.user.userId);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: AxiosResponse = await http.get(
          `documents/${documentId}/comments`
        );
        const formattedData = res.data?.data?.map((item: any) => ({
          id: item?.id,
          comment: item?.comment,
          time: DateTime.fromISO(item?.createdAt).toRelative(),
          user: item?.user?.username,
        }));
        setComments(formattedData);
        setLoading(false);
      } catch (err) {
        errorToastMessage(err as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, documentId]);

  useEffect(() => {
    socket.on("commentsUpdated", (comments) => {
      setComments((prev) => [...prev, comments]);
    });

    return () => {
      socket.off("commentsUpdated");
    };
  }, []);

  const addComment = async () => {
    try {
      if (!commentText.trim()) return;
      socket.emit("addComment", {
        documentId,
        comment: commentText.trim(),
        userId,
      });
      setCommentText("");
    } catch (error) {}
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          borderRadius: 2,
          mt: 2,
          mb: "30px",
        }}
      >
        <InputBase
          multiline
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          minRows={3}
          placeholder="Write a comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addComment();
            }
          }}
          sx={{ p: 2, color: "text.primary" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton onClick={addComment} sx={RoundedButtonStyle}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
      <Paper
        sx={{
          height: "calc(100% - 231px)",
          overflowY: "hidden",
          borderRadius: 2,
          p: "24px 20px",

          ":hover": {
            overflowY: "auto",
          },
        }}
      >
        <Stack gap="36px">
          {!loading ? (
            comments?.map((comment) => (
              <Box key={comment?.id}>
                <Box
                  sx={{
                    mb: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{ width: 24, height: 24, bgcolor: deepPurple[500] }}
                  />
                  <Typography
                    sx={{ textTransform: "capitalize", color: deepOrange[500] }}
                  >
                    {comment?.user || ""}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "#12213B",
                    p: "10px 14px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography>{comment?.comment}</Typography>
                </Box>
              </Box>
            ))
          ) : (
            <>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: "12px",
                      }}
                    >
                      <Skeleton variant="circular" width={24} height={24} />
                      <Skeleton variant="text" width={100} />
                    </Box>
                    <Skeleton variant="rounded" height={44} />
                  </Box>
                ))}
            </>
          )}
        </Stack>
      </Paper>
    </>
  );
};

export default Comments;
