import { useEffect } from "react";
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
Paste your script here
</p>
`;

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;

  & .ProseMirror {
    /* font-family: "Aleo", serif; */
    border: 2px solid var(--color-primary-t1);
    background-color: var(--color-grey-t1);
    color: var(--color-grey-s2);
    border-radius: var(--border-radius);
    padding: 1rem;
    outline: none;
    line-height: 4.5;

    &:focus,
    &:hover {
      border-color: var(--color-primary);
    }
  }
`;

const Script = ({ initialContent }) => {
  const editor = useEditor({
    // register extensions
    extensions,
    // set initial content
    content: initialContent || content,
    // place the cursor in the editor after initialization
    autofocus: true,
    // prevent loading the default CSS
    injectCSS: false,
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

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
