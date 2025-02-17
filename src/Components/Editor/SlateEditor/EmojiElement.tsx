import { Box, Fade, IconButton } from "@mui/material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Editor } from "slate";
import { useState } from "react";
import { EmojiEmotions } from "@mui/icons-material";
import { useSlate } from "slate-react";
import { RoundedButtonStyle } from "../../Common/UI/IconButton";

const EmojiElement = () => {
  const editor = useSlate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    Editor.insertText(editor, emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        sx={{ ...RoundedButtonStyle }}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        <EmojiEmotions
          sx={{
            color: showEmojiPicker ? "primary.main" : "text.primary",
          }}
        />
      </IconButton>
      <Fade in={showEmojiPicker}>
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            top: "50px",
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default EmojiElement;
