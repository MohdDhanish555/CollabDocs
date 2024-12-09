import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";

import DocumentsLoader from "./Loader";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  setDocuments,
  setLoading,
} from "../../../Redux/reducers/dashboardSlice";
import { errorToastMessage } from "../../../utils/toast";
import { AxiosResponse } from "axios";
import http from "../../../utils/http";
import DocumentCard from "./DocumentCard";
import { ReceiptLong } from "@mui/icons-material";
import { Document } from "./documents.type";
import { useNavigate } from "react-router";

const Documents = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { documents, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const res: AxiosResponse = await http.get("/documents");
        const data = res.data?.data;
        const formattedData: Document[] = data.map((doc: any) => ({
          id: doc?.id,
          title: doc?.title,
          createdAt: DateTime.fromISO(doc?.createdAt).toRelative(),
        }));

        dispatch(setDocuments(formattedData));
        dispatch(setLoading(false));
      } catch (err) {
        errorToastMessage(err as Error);
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);

  const handleNavigate = (docId: string) => {
    navigate(`/document/${docId}`);
  };

  return (
    <Stack gap={2} sx={{ pt: 2 }}>
      {loading ? (
        <DocumentsLoader />
      ) : documents?.length ? (
        documents.map((doc: any) => (
          <DocumentCard
            key={doc?.id}
            doc={doc}
            handleNavigate={handleNavigate}
          />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            py: 4,
          }}
        >
          <ReceiptLong sx={{ color: "text.disabled" }} />
          <Typography variant="subtitle1" color="text.disabled">
            No documents found
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default Documents;
