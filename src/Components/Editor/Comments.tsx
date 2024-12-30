import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import { useParams } from "react-router";

import { errorToastMessage } from "../../utils/toast";
import http from "../../utils/http";
import socket from "../../utils/socketService";
import { useAppSelector } from "../../Redux/hooks";

type CommentType = {
  id: string;
  comment: string;
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
        const formattedData = res.data?.data?.map((item: CommentType) => ({
          id: item?.id,
          comment: item?.comment,
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
      <Box sx={{ bgcolor: "#3d52a0", p: 1, borderRadius: 2, mt: 1.5 }}>
        <Typography variant="h6" color="#fff">
          Comments
        </Typography>
      </Box>
      <Paper
        component="form"
        sx={{
          borderRadius: 2,
          mt: 2,
        }}
      >
        <InputBase
          multiline
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          minRows={3}
          placeholder="Add a comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addComment();
            }
          }}
          sx={{ p: 2, color: "text.primary" }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={addComment}>
            <Send color="primary" />
          </IconButton>
        </Box>
      </Paper>
      <Box
        sx={{
          height: "calc(100% - 261px)",
          overflowY: "auto",
        }}
      >
        {!loading ? (
          comments?.map((comment) => (
            <Typography key={comment?.id}>{comment?.comment}</Typography>
          ))
        ) : (
          <>
            <Skeleton />
          </>
        )}
      </Box>
    </>
  );
};

export default Comments;
