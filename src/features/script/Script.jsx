// Import React dependencies.
import React, { useCallback, useState } from "react";

// Import the Slate editor factory.
import { createEditor, Editor } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { EDIT_TYPES } from "../edit/editTypes";
import InlineEdit from "../edit/InlineEdit";
import { useUpdateScript } from "./useUpdateScript";

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
  // `useCallback` here to memoize the function for subsequent renders.
  // DOC: this function tells Slate how to render different types of elements.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  // DOC: this function tells Slate how to render inline text formatting.
  const renderLeaf = useCallback((props) => {
    // Find which edit types are present in the leaf.
    const leafAttributeNames = Object.keys(props.leaf);
    const foundTypes = leafAttributeNames.filter((type) =>
      Object.values(EDIT_TYPES).includes(type)
    );

    const editIds = foundTypes.map((type) => ({
      type,
      editId: props?.leaf?.[type].editId,
    }));

    // If there are edit types, render the InlineEdit component with the editId.

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
      {/* This component acts like contenteditable */}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onBlur={handleUpdateContent}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          if (event.key === "s") {
            event.preventDefault();
            Editor.addMark(editor, EDIT_TYPES.SFX, {
              editId: "editSFXId",
            });
          }

          if (event.key === "f") {
            event.preventDefault();
            Editor.addMark(editor, EDIT_TYPES.VFX, {
              editId: "editVFXId",
            });
          }

          if (event.key === "m") {
            event.preventDefault();
            Editor.addMark(editor, EDIT_TYPES.MUSIC, {
              editId: "editMusicId",
            });
          }

          if (event.key === "g") {
            event.preventDefault();
            Editor.addMark(editor, EDIT_TYPES.GRAPHIC, {
              editId: "editGraphicId",
            });
          }

          if (event.key === "b") {
            event.preventDefault();
            Editor.addMark(editor, EDIT_TYPES.BROLL, {
              editId: "editBrollId",
            });
          }
        }}
      />
    </Slate>
  );
};

// Define a React component renderer for our code blocks.
function CodeElement(props) {
  return (
    // Slate passes attributes that should be rendered on the top-most element of your blocks, so that you don't have to build them up yourself. You MUST mix the attributes into your component.
    <pre {...props.attributes}>
      {/* You MUST render the children as the lowest leaf in your component */}
      <code>{props.children}</code>
    </pre>
  );
}

function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>;
}

// Define a React component to render leaves with bold text.
function Leaf(props) {
  let style = {};
  if (props.leaf.bold) style.fontWeight = "bold";
  if (props.leaf.italic) style.fontStyle = "italic";
  if (props.leaf.underline) style.textDecoration = "underline";
  // DOC Leaves are the way to apply inline text formatting in Slate.
  return (
    // span because all leaves MUST be an inline element.
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
}

export default Script;
