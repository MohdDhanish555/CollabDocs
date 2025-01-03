import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Paper } from "@mui/material";

import Toolbar from "./Toolbar";
import { CustomElement, CustomText } from "../editor.type";
import EditorElements from "./EditorElements";
import EditorLeaf from "./EditorLeaf";
import { handleKeyDown } from "../../../utils/slateEditor";

const SlateEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const renderElement = useCallback(
    (props: { attributes: any; children: any; element: CustomElement }) => (
      <EditorElements {...props} />
    ),
    []
  );

  const renderLeaf = useCallback(
    (props: { attributes: any; children: any; leaf: CustomText }) => (
      <EditorLeaf {...props} />
    ),
    []
  );

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 64px)",
          minHeight: 300,
          px: 3,
          py: 2,
        }}
      >
        <Editable
          style={{ flex: 1, outline: "none" }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Start editing here..."
          spellCheck
          autoFocus
          onKeyDown={(e) => handleKeyDown(e, editor)}
        />
      </Paper>
    </Slate>
  );
};

export default SlateEditor;
