// Import React dependencies.
import React, { useCallback, useState } from "react";

// Import the Slate editor factory.
import { createEditor } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import styled from "styled-components";

import { EDIT_TYPES } from "../edit/editTypes";
import { ScriptActions } from "./ScriptActions";
import { useUpdateScript } from "./useUpdateScript";
import InlineEdit from "../edit/InlineEdit";
import HoveringToolbar from "./HoverToolbar";

const StyledEditable = styled(Editable)`
  border: 2px solid var(--color-grey);
  background-color: var(--color-grey-t3);
  color: var(--color-grey-s2);
  border-radius: var(--border-radius);
  padding: 0rem 2rem;
  outline: none;
  line-height: 5;

  &:focus,
  &:hover {
    border-color: var(--color-primary);
  }
`;

const Script = ({ script }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const { isUpdating, updateScript } = useUpdateScript();

  const initialValue =
    JSON.parse(script?.content || "[]").length > 0
      ? JSON.parse(script?.content)
      : [
          {
            type: "paragraph",
            children: [{ text: "Pega tu guion aquí" }],
          },
        ];

  // Define a rendering function based on the element passed to `props`. We use
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // DOC: this function tells Slate how to render inline text formatting.
  const renderLeaf = useCallback((props) => {
    // DOC props contains a leaf element with the attributes specified in the function Editor.addMark. To access them we need to know the type of the mark, since the info is in the format of `props.leaf.type`.
    // To be able to know the type of the mark, we need to check if the leaf has any of the edit types defined in EDIT_TYPES. I have not found another way of doing it

    // Find which edit types are present in the leaf.
    const leafAttributeNames = Object.keys(props.leaf);
    const foundTypes = leafAttributeNames.filter((type) =>
      Object.values(EDIT_TYPES).includes(type)
    );

    const editIds = foundTypes.map((type) => ({
      type,
      editId: props?.leaf?.[type].editId,
    }));

    // Pass them to be accessed by InlineEdit.
    // NOTE: they cannot be accessed directly in the InlineEdit component, so we pass them as a prop.
    return <InlineEdit {...props} editIds={editIds} />;
  }, []);

  function handleUpdateContent() {
    const newContent = JSON.stringify(editor.children);

    if (!script?.id || !newContent || isUpdating) return;
    if (newContent === script?.content) return;

    updateScript({
      id: script?.id,
      data: { content: newContent },
    });
  }

  return (
    // Add the editable component inside the context.
    <Slate editor={editor} initialValue={initialValue}>
      <HoveringToolbar />
      {/* This component acts like contenteditable */}
      <StyledEditable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onBlur={handleUpdateContent}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          if (event.key === "s") {
            event.preventDefault();
            ScriptActions.addMark(editor, EDIT_TYPES.SFX, "editSFXId");
          }

          if (event.key === "f") {
            event.preventDefault();
            ScriptActions.addMark(editor, EDIT_TYPES.VFX, "editVFXId");
          }

          if (event.key === "m") {
            event.preventDefault();
            ScriptActions.addMark(editor, EDIT_TYPES.MUSIC, "editMusicId");
          }

          if (event.key === "g") {
            event.preventDefault();
            ScriptActions.addMark(editor, EDIT_TYPES.GRAPHIC, "editGraphicId");
          }

          if (event.key === "b") {
            event.preventDefault();
            ScriptActions.addMark(editor, EDIT_TYPES.BROLL, "editBrollId");
          }
        }}
      />
    </Slate>
  );
};

function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>;
}

export default Script;
