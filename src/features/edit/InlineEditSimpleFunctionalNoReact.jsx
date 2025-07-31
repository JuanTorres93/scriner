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

const inlineEditFactory = (editType) => {
  return Mark.create(() => {
    return {
      name: `inlineEdit${editType}`,

      addAttributes() {
        return {
          color: {
            default: "yellow",
            parseHTML: (element) => element.getAttribute("data-color"),
            renderHTML: (attributes) => ({
              "data-color": attributes.color,
              style: `background-color: ${attributes.color}`,
            }),
          },
        };
      },

      parseHTML() {
        return [{ tag: "mark" }];
      },

      renderHTML({ HTMLAttributes }) {
        return ["mark", HTMLAttributes, 0];
      },
    };
  });
};

export default inlineEditFactory;
