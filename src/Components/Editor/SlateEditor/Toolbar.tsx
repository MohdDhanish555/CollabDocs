import { Box, Fade, IconButton, SvgIconTypeMap } from "@mui/material";

import { useSlate } from "slate-react";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import {
  formattingOptions,
  isBlockActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
} from "../../../utils/slateEditor";
import { StyledToolbar } from "../editor.style";
import { RoundedButtonStyle } from "../../Common/UI/IconButton";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Editor } from "slate";
import { useState } from "react";
import { EmojiEmotions } from "@mui/icons-material";

const ToolbarItem = ({
  format,
  Icon,
  type,
}: {
  format: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  type: string;
}) => {
  const editor = useSlate();
  const isActive =
    type === "mark"
      ? isMarkActive(editor, format)
      : isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        );

  return (
    <IconButton
      sx={{
        ...RoundedButtonStyle,
        color: isActive ? "primary.main" : "text.primary",
        cursor: "pointer",
      }}
      onMouseDown={(event: any) => {
        event.preventDefault();
        if (type === "mark") {
          toggleMark(editor, format);
        } else {
          toggleBlock(editor, format);
        }
      }}
    >
      <Icon />
    </IconButton>
  );
};

const Toolbar = () => {
  const editor = useSlate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    Editor.insertText(editor, emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <StyledToolbar>
      {formattingOptions.map((option) => (
        <ToolbarItem
          key={option.format}
          format={option.format}
          Icon={option.icon}
          type={option.type}
        />
      ))}
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
    </StyledToolbar>
  );
};

export default Toolbar;
