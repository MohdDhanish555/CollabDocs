import React from "react";
import { ReactEditor } from "slate-react";
import { BaseEditor, Editor, Element as SlateElement, Transforms } from "slate";
import isHotkey from "is-hotkey";
import { HistoryEditor } from "slate-history";
import {
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  LooksOne,
  LooksTwo,
} from "@mui/icons-material";

import { CustomElement } from "../Components/Editor/editor.type";

export const HOTKEYS: Record<string, string> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export const formattingOptions = [
  {
    format: "bold",
    icon: FormatBold,
    type: "mark",
  },
  {
    format: "italic",
    icon: FormatItalic,
    type: "mark",
  },
  {
    format: "underline",
    icon: FormatUnderlined,
    type: "mark",
  },
  {
    format: "code",
    icon: Code,
    type: "mark",
  },
  {
    format: "heading-one",
    icon: LooksOne,
    type: "block",
  },
  {
    format: "heading-two",
    icon: LooksTwo,
    type: "block",
  },
  {
    format: "block-quote",
    icon: FormatQuote,
    type: "block",
  },
  {
    format: "numbered-list",
    icon: FormatListNumbered,
    type: "block",
  },
  {
    format: "bulleted-list",
    icon: FormatListBulleted,
    type: "block",
  },
  {
    format: "left",
    icon: FormatAlignLeft,
    type: "block",
  },
  {
    format: "center",
    icon: FormatAlignCenter,
    type: "block",
  },
  {
    format: "right",
    icon: FormatAlignRight,
    type: "block",
  },
  {
    format: "justify",
    icon: FormatAlignJustify,
    type: "block",
  },
];

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: BaseEditor & ReactEditor & HistoryEditor
) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      toggleMark(editor, mark);
    }
  }
};

export const isBlockActive = (
  editor: Editor,
  format: string,
  blockType: "type" | "align" = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as CustomElement)[blockType] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
