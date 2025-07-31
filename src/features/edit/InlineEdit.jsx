import { Mark } from "@tiptap/core";

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
          // HTML attributes to be added to the mark
          // I use this to select the mark in the HTML
          [`data-edit-type-${editType}`]: {
            // Assign a default value to the attribute
            default: editType,
            // This is used to parse the HTML and convert it to internal Tiptap format
            parseHTML: (element) =>
              element.getAttribute(`data-edit-type-${editType}`),
            // This is used to render the HTML from internal Tiptap format. It returns an object with the attributes to be added to the mark
            // Styling is done in GlobalStyles.js
            renderHTML: (attributes) => ({
              [`data-edit-type-${editType}`]:
                attributes[`data-edit-type-${editType}`],
              class: `inline-edit inline-edit-${editType}`,
            }),
          },
        };
      },

      parseHTML() {
        return [{ tag: `mark[data-edit-type-${editType}]` }];
      },

      renderHTML({ HTMLAttributes }) {
        return ["mark", HTMLAttributes, 0];
      },
    };
  });
};

export default inlineEditFactory;
