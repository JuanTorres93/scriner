import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

import InlineEdit from "../edit/InlineEdit";

// define your extension array
const extensions = [StarterKit, InlineEdit];

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
    line-height: 2.5;
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
        <button
          onClick={() => {
            editor.chain().focus().toggleMark("inlineEdit").run();
          }}
        >
          Toggle Mark
        </button>
        <EditorContent editor={editor} />
      </StyledEditorContainer>

      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};

export default Script;
