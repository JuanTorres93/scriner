// src/Tiptap.tsx
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

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
  }
`;
const Script = () => {
  const editor = useEditor({
    extensions,
    content,
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
      </StyledEditorContainer>

      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};

export default Script;
