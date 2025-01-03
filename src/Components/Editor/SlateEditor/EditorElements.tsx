import React from "react";
import { CustomElement } from "../editor.type";

const EditorElements = ({
  attributes,
  children,
  element,
}: {
  attributes: any;
  children: any;
  element: CustomElement;
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={{
            borderLeft: "2px solid #ccc",
            paddingLeft: "10px",
            color: "#666",
            fontStyle: "italic",
            margin: "8px 0",
          }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          style={{
            paddingLeft: "20px",
            listStylePosition: "inside",
            margin: 0,
          }}
          {...attributes}
        >
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol
          style={{
            paddingLeft: "20px",
            listStylePosition: "inside",
            margin: 0,
          }}
          {...attributes}
        >
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default EditorElements;
