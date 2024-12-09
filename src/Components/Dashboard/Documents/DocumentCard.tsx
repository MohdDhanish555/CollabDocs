import React from "react";
import { DocumentCardProps } from "./documents.type";
import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import { DocumentIcon } from "./Icons";

const DocumentCard = ({ doc, handleNavigate }: DocumentCardProps) => {
  return (
    <Card
      sx={{
        height: "100px",
      }}
      onClick={() => handleNavigate(doc?.id)}
    >
      <CardActionArea sx={{ height: "inherit" }}>
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
            <Typography variant="body2" color="text.disabled">
              {doc?.createdAt}
            </Typography>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DocumentCard;
