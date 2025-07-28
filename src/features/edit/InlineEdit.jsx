// InlineEdit.js
import { Mark } from "@tiptap/core";
import { ReactMarkViewRenderer, MarkViewContent } from "@tiptap/react";

import styled, { css } from "styled-components";

export const inlineEditTypes = {
  sfx: "SFX",
  vfx: "VFX",
  graphic: "GRAPHIC",
  broll: "BROLL",
  music: "MUSIC",
};

const markHeightPx = 5;
const spaceBetweenMarksPx = 10;

const StyledMark = styled.mark`
  background-color: transparent;

  ${(props) =>
    props.editType === inlineEditTypes.sfx &&
    css`
      border-bottom: ${markHeightPx}px solid red;
    `}

  ${(props) =>
    props.editType === inlineEditTypes.vfx &&
    css`
      border-top: ${markHeightPx}px solid blue;
    `}

  ${(props) =>
    props.editType === inlineEditTypes.graphic &&
    css`
      border-top: ${markHeightPx}px solid green;
      padding-top: ${spaceBetweenMarksPx}px;
    `}

  ${(props) =>
    props.editType === inlineEditTypes.broll &&
    css`
      border-top: ${markHeightPx}px solid purple;
      padding-top: ${spaceBetweenMarksPx * 2}px;
    `}

  ${(props) =>
    props.editType === inlineEditTypes.music &&
    css`
      background-color: lightgray;
    `}
`;

const InlineMark = (props) => {
  const { editType } = props.extension.options;

  function handleClick(event) {
    event.preventDefault();

    // TODO Handle the click event for the inline mark
    console.log(`Clicked on inline edit mark of type: ${editType}`);
  }

  return (
    <StyledMark editType={editType} onClick={handleClick}>
      <MarkViewContent {...props} />
    </StyledMark>
  );
};

const inlineEditFactory = (editType) => {
  return Mark.create(() => {
    function onCreate() {}

    function onUpdate() {
      // TODO Open modal to add the inline edit
    }

    return {
      name: `inlineEdit${editType}`,
      onCreate,
      onUpdate,

      addOptions() {
        return {
          HTMLAttributes: {},
          editType,
        };
      },

      addMarkView() {
        // Custom react component for the mark
        return ReactMarkViewRenderer(InlineMark);
      },

      parseHTML() {
        // How to recognize this mark in the HTML
        return [{ tag: `mark[data-inline-edit-${editType}]` }];
      },

      renderHTML({ HTMLAttributes }) {
        return [
          "mark",
          { ...HTMLAttributes, [`data-inline-edit-${editType}`]: "" },
          0,
        ];
      },
    };
  });
};

export default inlineEditFactory;
