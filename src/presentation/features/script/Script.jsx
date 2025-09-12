import React, { useCallback, useMemo, useRef } from "react";
import { Editable, useSlate } from "slate-react";
import styled from "styled-components";

import { useUpdateScript } from "./useUpdateScript";
import InlineEdit from "../edit/InlineEdit";
import HoveringToolbar from "./HoverToolbar";
import { EDIT_TYPES } from "../../../domain/edit/editTypes";

const StyledEditable = styled(Editable)`
  border: 2px solid var(--color-grey);
  background-color: var(--color-grey-t3);
  color: var(--color-grey-s2);
  border-radius: var(--border-radius);
  padding: 0rem 2rem;
  outline: none;
  line-height: 2.5;
  overflow-y: scroll;

  &:focus,
  &:hover {
    border-color: var(--color-primary);
  }
`;

const Script = ({ script, className }) => {
  // className is for layout purposes
  const editor = useSlate();
  const { isUpdating, updateScript } = useUpdateScript();
  const editableRef = useRef(null);

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
    updateScript({ id: script?.id, data: { content: newContent } });
  }

  const getSelectionRect = useMemo(() => {
    return () => {
      const sel = window.getSelection?.();
      if (!sel || sel.rangeCount === 0) return null;

      // 1) Try to anchor to the *focus caret* (follows the mouse direction)
      try {
        const r = document.createRange();
        // Guard: focusNode might be null/detached during fast drags
        if (sel.focusNode) {
          r.setStart(sel.focusNode, sel.focusOffset);
          r.collapse(true);
          // Prefer a non-zero rect if available
          let rect = r.getBoundingClientRect();
          if (rect && (rect.width > 0 || rect.height > 0)) return rect;

          // Some engines return 0x0 for collapsed ranges—fallback to client rects
          const clientRects = r.getClientRects?.();
          if (clientRects && clientRects.length) return clientRects[0];
        }
      } catch (_) {
        // swallow and continue to fallback
      }

      // 2) Fallback: end-of-range (works fine for downward selections)
      try {
        const base = sel.getRangeAt(0).cloneRange();
        base.collapse(false); // end in DOM order
        let rect = base.getBoundingClientRect();
        if (rect && (rect.width > 0 || rect.height > 0)) return rect;

        const clientRects = base.getClientRects?.();
        if (clientRects && clientRects.length)
          return clientRects[clientRects.length - 1];
      } catch (_) {
        // final fallback → no rect
      }

      return null;
    };
  }, []);

  return (
    <>
      <HoveringToolbar
        getSelectionRect={getSelectionRect}
        editableRef={editableRef}
      />
      <StyledEditable
        ref={editableRef}
        className={className}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onBlur={handleUpdateContent}
      />
    </>
  );
};

function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>;
}

export default Script;
