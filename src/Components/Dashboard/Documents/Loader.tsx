import React from "react";
import { Skeleton } from "@mui/material";

const DocumentsLoader = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Skeleton height={100} key={index} variant="rounded" />
        ))}
    </>
  );
};

export default DocumentsLoader;
