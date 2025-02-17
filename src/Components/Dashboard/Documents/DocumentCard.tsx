import React from "react";
import { DocumentCardProps } from "./documents.type";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { DocumentIcon } from "./Icons";

const DocumentCard = ({ doc, handleNavigate }: DocumentCardProps) => {
  return (
    <Card
      sx={{
        height: "100px !important",
        overflow: "visible",
      }}
      onClick={() => handleNavigate(doc?.id)}
    >
      <CardActionArea sx={{ height: "100px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
          }}
        >
          <DocumentIcon />
          <Stack>
            <Typography variant="subtitle1">
              {doc?.title || "Untitled"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doc?.createdAt}
            </Typography>
          </Stack>
          {!doc?.isOwner && (
            <Box sx={{ ml: "auto" }}>
              <Chip label={"Collaborator"} color="primary" variant="outlined" />
            </Box>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DocumentCard;
