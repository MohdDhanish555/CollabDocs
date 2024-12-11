import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ReceiptLong } from "@mui/icons-material";
import { DateTime } from "luxon";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

import { DocumentsWrapper, EmptyDataContainer } from "../dashboard.style";

import DocumentsLoader from "./Loader";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  setDocuments,
  setLoading,
} from "../../../Redux/reducers/dashboardSlice";
import { errorToastMessage } from "../../../utils/toast";
import http from "../../../utils/http";
import DocumentCard from "./DocumentCard";
import { Document } from "./documents.type";
import Navigators from "./Navigators/Navigators";

const Documents = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { documents, loading } = useAppSelector((state) => state.dashboard);
  const targetRef = useRef<any>();

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
    <Box sx={DocumentsWrapper} ref={targetRef}>
      <Box id="back-to-top-anchor" />
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
        <Box sx={EmptyDataContainer}>
          <ReceiptLong sx={{ color: "text.disabled" }} />
          <Typography variant="subtitle1" color="text.disabled">
            No documents found
          </Typography>
        </Box>
      )}
      <Navigators targetRef={targetRef} />
    </Box>
  );
};

export default Documents;
