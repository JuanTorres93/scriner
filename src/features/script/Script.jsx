import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

import inlineEditFactory, { inlineEditTypes } from "../edit/InlineEdit";

// define your extension array
const extensions = [
  StarterKit,
  inlineEditFactory(inlineEditTypes.sfx),
  inlineEditFactory(inlineEditTypes.vfx),
  inlineEditFactory(inlineEditTypes.graphic),
  inlineEditFactory(inlineEditTypes.broll),
  inlineEditFactory(inlineEditTypes.music),
];

const content = `
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  nulla facilisi. Sed non risus. Suspendisse lectus tortor,
  dignissim sit amet, adipiscing nec, ultricies sed, dolor.
   
  Cras elementum ultrices diam. Maecenas ligula massa,
  varius a, semper congue, euismod non, mi. Proin porttitor,
  orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
</p>
`;

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;

  & .ProseMirror {
    font-family: "Courier New", Courier, monospace;
    max-width: 60rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    outline: none;
    line-height: 3.5;
  }
`;

const Script = () => {
  const editor = useEditor({
    // register extensions
    extensions,
    // set initial content
    content,
    // place the cursor in the editor after initialization
    autofocus: true,
    // prevent loading the default CSS
    injectCSS: false,
  });

  const editorState = useEditorState({
    editor,
    // the selector function is used to select the state you want to react to
    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
        currentContent: editor.getJSON(),
        // you can add more state properties here e.g.:
        // isBold: editor.isActive('bold'),
        // isItalic: editor.isActive('italic'),
      };
    },
  });

  return (
    <>
      <StyledEditorContainer>
        <EditorContent editor={editor} />

        <BubbleMenu editor={editor}>
          <button
            onClick={() => {
              editor.chain().focus().toggleMark("inlineEditSFX").run();
            }}
          >
            Add SFX
          </button>

          <button
            onClick={() => {
              editor.chain().focus().toggleMark("inlineEditVFX").run();
            }}
          >
            Add VFX
          </button>

          <button
            onClick={() => {
              editor.chain().focus().toggleMark("inlineEditGRAPHIC").run();
            }}
          >
            Add Graphic
          </button>

          <button
            onClick={() => {
              editor.chain().focus().toggleMark("inlineEditBROLL").run();
            }}
          >
            Add B-Roll
          </button>

          <button
            onClick={() => {
              editor.chain().focus().toggleMark("inlineEditMUSIC").run();
            }}
          >
            Add Music
          </button>
        </BubbleMenu>
      </StyledEditorContainer>
    </>
  );
};

export default Script;
