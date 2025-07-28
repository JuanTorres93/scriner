// InlineEdit.js
import { Mark } from "@tiptap/core";
import { ReactMarkViewRenderer, MarkViewContent } from "@tiptap/react";

import styled from "styled-components";

const markHeightPx = 5;

const StyledMark = styled.mark`
  position: relative;
  background-color: transparent;

  &::before {
    content: "";
    position: absolute;
    top: -${markHeightPx}px;
    left: 0;
    width: 100%;
    height: ${markHeightPx}px;
    background-color: blue;
    border-radius: 8px;
    opacity: 0.8;
    transition: all 0.2s ease;
    cursor: pointer;
    transform-origin: center;
    transform: scaleY(1);
  }

  &:hover::before {
    opacity: 1;
    background-color: red;
    transform: scaleY(1.2);
  }
`;

const MyCustomMark = (props) => (
  <StyledMark>
    <MarkViewContent {...props} />
  </StyledMark>
);

// Define la extensión
const InlineEdit = Mark.create({
  name: "inlineEdit",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addMarkView() {
    // Custom react component for the mark
    return ReactMarkViewRenderer(MyCustomMark);
  },

  parseHTML() {
    // How to recognize this mark in the HTML
    return [{ tag: "mark[data-inline-edit]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["mark", { ...HTMLAttributes, "data-inline-edit": "" }, 0];
  },
});

export default InlineEdit;
