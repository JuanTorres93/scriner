import { Mark } from "@tiptap/core";
import { ReactMarkViewRenderer, MarkViewContent } from "@tiptap/react";

import styled, { css } from "styled-components";

export const inlineEditTypes = {
  sfx: "sfx",
  vfx: "vfx",
  graphic: "graphic",
  broll: "broll",
  music: "music",
};

const markHeightPx = 5;
const spaceBetweenMarksPx = 10;

const StyledMark = styled.mark`
  background-color: transparent;
  font-weight: var(--font-weight-thinest);

  ${(props) =>
    props.editType === inlineEditTypes.sfx &&
    css`
      border-bottom: ${markHeightPx}px solid var(--color-sfx);
    `}

  ${(props) =>
    props.editType === inlineEditTypes.vfx &&
    css`
      border-top: ${markHeightPx}px solid var(--color-vfx);
    `}

  ${(props) =>
    props.editType === inlineEditTypes.graphic &&
    css`
      border-top: ${markHeightPx}px solid var(--color-graphic);
      padding-top: ${spaceBetweenMarksPx}px;
    `}

  ${(props) =>
    props.editType === inlineEditTypes.broll &&
    css`
      border-top: ${markHeightPx}px solid var(--color-broll);
      padding-top: ${spaceBetweenMarksPx * 2}px;
    `}

  ${(props) =>
    props.editType === inlineEditTypes.music &&
    /* TODO (maybe not here) Different colors for different emotions*/
    css`
      background-color: lightgray;
    `}
`;

const InlineMark = (props) => {
  const { editType } = props.extension.options;

  // TODO DELETE THESE DEBUG LOGS
  console.log("editType");
  console.log(editType);

  function handleClick(event) {
    event.preventDefault();

    // TODO Handle the click event for the inline mark
    console.log(`Clicked on inline edit mark of type: ${editType}`);
  }

  return (
    <StyledMark className="ANACARDO" editType={editType} onClick={handleClick}>
      {/* <MarkViewContent {...props} /> */}
      <MarkViewContent />
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

      addAttributes() {
        return {
          editType: {
            default: editType,
          },
          [`data-inline-edit-${editType}`]: {
            default: "",
          },
        };
      },

      parseHTML() {
        // parseHTML converts HTML to internal Tiptap format
        // How to recognize this mark in the HTML
        return [{ tag: `mark[data-inline-edit-${editType}]` }];
      },

      renderHTML({ HTMLAttributes }) {
        // renderHTML converts internal Tiptap format to HTML
        return [
          "mark",
          {
            ...HTMLAttributes,
          },
          0,
        ];
      },
    };
  });
};

export default inlineEditFactory;
