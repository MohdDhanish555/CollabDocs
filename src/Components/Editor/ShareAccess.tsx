import React, { useState } from "react";
import { FolderShared } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AccessModal from "./AccessModal";
import { RoundedButtonStyle } from "../Common/UI/IconButton";

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
          ...RoundedButtonStyle,
          ml: "auto",
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
