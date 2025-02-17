import React from "react";
import { useSlate } from "slate-react";
import { IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { RoundedButtonStyle } from "../../Common/UI/IconButton";

const HistoryElements = () => {
  const editor = useSlate();

  const canUndo = editor.history.undos.length > 0;
  const canRedo = editor.history.redos.length > 0;

  return (
    <>
      <IconButton
        sx={{
          ...RoundedButtonStyle,
          color: canUndo ? "text.primary" : "text.disabled",
        }}
        onClick={() => editor.undo()}
        disabled={!canUndo}
      >
        <UndoIcon />
      </IconButton>
      <IconButton
        sx={{
          ...RoundedButtonStyle,
          color: canRedo ? "text.primary" : "text.disabled",
        }}
        onClick={() => editor.redo()}
        disabled={!canRedo}
      >
        <RedoIcon />
      </IconButton>
    </>
  );
};

export default HistoryElements;
