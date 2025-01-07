import { IconButton, SvgIconTypeMap } from "@mui/material";

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
// import HistoryElements from "./HistoryElements";
import EmojiElement from "./EmojiElement";

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
  return (
    <StyledToolbar>
      {/* <HistoryElements /> */}
      {formattingOptions.map((option) => (
        <ToolbarItem
          key={option.format}
          format={option.format}
          Icon={option.icon}
          type={option.type}
        />
      ))}
      <EmojiElement />
    </StyledToolbar>
  );
};

export default Toolbar;
