import React from "react";
import { CustomText } from "../editor.type";

const EditorLeaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: any;
  leaf: CustomText;
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default EditorLeaf;
