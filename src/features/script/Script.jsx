import { useEffect } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import styled from "styled-components";

import inlineEditFactory, { inlineEditTypes } from "../edit/InlineEdit";
import { useUpdateScript } from "./useUpdateScript";

// define your extension array
const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Escribe tu guión aquí...",
  }),
  inlineEditFactory(inlineEditTypes.sfx),
  inlineEditFactory(inlineEditTypes.vfx),
  inlineEditFactory(inlineEditTypes.graphic),
  inlineEditFactory(inlineEditTypes.broll),
  inlineEditFactory(inlineEditTypes.music),
];

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;

  & .ProseMirror {
    border: 2px solid var(--color-grey);
    background-color: var(--color-grey-t3);
    color: var(--color-grey-s2);
    border-radius: var(--border-radius);
    padding: 0rem 2rem;
    outline: none;
    line-height: 4.5;

    &:focus,
    &:hover {
      border-color: var(--color-primary);
    }

    /* placeholder styles */
    p.is-editor-empty:first-child::before {
      color: var(--color-grey);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
`;

const Script = ({ script }) => {
  const { updateScript, isUpdating } = useUpdateScript();

  const editor = useEditor({
    // register extensions
    extensions,
    // set initial content
    content: script?.content,
    // place the cursor in the editor after initialization
    autofocus: true,
    // prevent loading the default CSS
    injectCSS: false,
  });

  useEffect(() => {
    if (editor && script) {
      editor.commands.setContent(script.content);
    }
  }, [editor, script]);

  function handleUpdateContent() {
    const newContent = editor.getHTML();

    if (!script || !newContent || isUpdating) return;
    if (newContent === script.content) return;

    updateScript({ id: script.id, data: { content: newContent } });
  }

  return (
    <>
      <StyledEditorContainer>
        <EditorContent onBlur={handleUpdateContent} editor={editor} />

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
