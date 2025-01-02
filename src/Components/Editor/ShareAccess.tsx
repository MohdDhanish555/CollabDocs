import React, { useState } from "react";
import { FolderShared } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AccessModal from "./AccessModal";

const ShareAccess = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IconButton
        onClick={openModal}
        sx={{
          ml: "auto",
          borderRadius: 1,
          bgcolor: "#161E30",
          boxShadow: `
                inset 0px 8px 12px 0px rgba(35, 48, 74, 0.5), 
                0px 20px 20px -16px rgba(0, 0, 0, 0.5)
              `,
        }}
      >
        <FolderShared htmlColor="#fff" />
      </IconButton>
      {showModal && (
        <AccessModal showModal={showModal} closeModal={closeModal} />
      )}
    </>
  );
};

export default ShareAccess;
