import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Paper } from "@mui/material";

import Toolbar from "./Toolbar";
import { CustomElement, CustomText } from "../editor.type";
import EditorElements from "./EditorElements";
import EditorLeaf from "./EditorLeaf";
import { handleKeyDown } from "../../../utils/slateEditor";
import { useParams } from "react-router";
import socket from "../../../utils/socketService";

const SlateEditor = () => {
  const { id: documentId } = useParams<{ id: string }>();
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const isRemoteUpdate = useRef(false);

  const handleEditorChange = (newValue: Descendant[]) => {
    if (!isRemoteUpdate.current) {
      const operations = editor.operations.filter(
        (operation) => operation.type !== "set_selection"
      );

      if (operations.length > 0) {
        socket.emit("contentWrite", { documentId, operations });
      }
    }

    isRemoteUpdate.current = false;
    setValue(newValue);
  };

  useEffect(() => {
    socket.on("contentUpdate", ({ operations }) => {
      isRemoteUpdate.current = true;
      operations.forEach((operation: any) => editor.apply(operation));
    });

    return () => {
      socket.off("contentUpdate");
    };
  }, [editor]);

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
    <Slate editor={editor} initialValue={value} onChange={handleEditorChange}>
      <Toolbar />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 64px)",
          overflowY: "auto",
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
