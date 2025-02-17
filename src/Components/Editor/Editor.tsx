import { Box, CircularProgress } from "@mui/material";

import RightPanel from "./RightPanel";
import LiveCursors from "./LiveCursors";
import { useEffect, useState } from "react";
import SlateEditor from "./SlateEditor/SlateEditor";
import { AxiosResponse } from "axios";
import http from "../../utils/http";
import { useParams } from "react-router";
import RequestAccess from "./RequestAccess";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  reset as setDocumentReset,
  setDocumentAccess,
  setDocumentDetails,
} from "../../Redux/reducers/documentSlice";
import { setDocumentLoader as setLoader } from "../../Redux/reducers/documentSlice";

export interface User {
  id: string;
  username: string;
}

const Editor = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  return (
    <Box sx={{ display: "flex", height: "100%", gap: 2 }}>
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

const EditorWrapper = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.document.loading);
  const hasAccess = useAppSelector((state) => state.document.hasAccess);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoader(true));
        const res: AxiosResponse = await http.get(`/documents/${id}`);
        const data = res.data?.data;
        dispatch(
          setDocumentDetails({
            title: data?.title,
            content: data?.content,
            authorId: data?.authorId,
          })
        );
        dispatch(setDocumentAccess(true));
        dispatch(setLoader(false));
      } catch (err) {
        // errorToastMessage(err as Error);
        dispatch(setLoader(false));
        dispatch(setDocumentAccess(false));
      }
    };
    fetchData();

    return () => {
      dispatch(setDocumentReset());
    };
  }, [dispatch, id]);

  return (
    <Box sx={{ height: "100%", px: 2, py: 3 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : !hasAccess ? (
        <RequestAccess />
      ) : (
        <Editor />
      )}
    </Box>
  );
};

export default EditorWrapper;
