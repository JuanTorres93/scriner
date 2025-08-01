import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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

// TODO NEXT nueva rama y probar Slate.js para el editor

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
    // place the cursor in the editor after initialization
    autofocus: true,
    // prevent loading the default CSS
    injectCSS: false,
    immediatelyRender: true,
  });

  useEffect(() => {
    if (editor && script.id) {
      editor.commands.setContent(script.content);
    }
  }, [editor, script, script.id]);

  function handleUpdateContent() {
    const newContent = editor.getHTML();

    if (!script || !newContent || isUpdating) return;
    if (newContent === script.content) return;

    updateScript({ id: script.id, data: { content: newContent } });
  }

  function handleAddMark(editType) {
    if (!editor) return;

    editor.chain().focus().setMark(`inlineEdit${editType}`).run();

    updateScript({
      id: script.id,
      data: { content: editor.getHTML() },
    });
  }

  // TODO NEXT. Las marks se quedan guardadas en el HTML, mostrarlas

  return (
    <>
      <StyledEditorContainer>
        <EditorContent
          key={script.id}
          onBlur={handleUpdateContent}
          editor={editor}
        />
        <BubbleMenu editor={editor}>
          <button
            onClick={() => {
              handleAddMark(inlineEditTypes.music);
            }}
          >
            Add Music
          </button>

          <button
            onClick={() => {
              handleAddMark(inlineEditTypes.sfx);
            }}
          >
            Add SFX
          </button>

          <button
            onClick={() => {
              handleAddMark(inlineEditTypes.vfx);
            }}
          >
            Add VFX
          </button>

          <button
            onClick={() => {
              handleAddMark(inlineEditTypes.graphic);
            }}
          >
            Add Graphic
          </button>

          <button
            onClick={() => {
              handleAddMark(inlineEditTypes.broll);
            }}
          >
            Add B-Roll
          </button>
        </BubbleMenu>
      </StyledEditorContainer>
    </>
  );
};

export default Script;
