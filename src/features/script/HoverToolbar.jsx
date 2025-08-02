import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";
import styled, { css } from "styled-components";

const HoveringToolbar = () => {
  const ref = useRef(null);
  const editor = useSlate();
  const inFocus = useFocused();
  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    if (!el) {
      return;
    }
    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });
  return (
    <Portal>
      <Menu
        ref={ref}
        className={css``}
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <button>b1</button>
        <button>b2</button>
        {/* <FormatButton format="bold" icon="format_bold" /> */}
        {/* <FormatButton format="italic" icon="format_italic" /> */}
        {/* <FormatButton format="underline" icon="format_underlined" /> */}
      </Menu>
    </Portal>
  );
};

const StyledMenu = styled.div`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: var(--color-grey-t1);
  border-radius: 4px;
  transition: opacity 0.2s ease;

  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`;

export const Menu = React.forwardRef(({ ...props }, ref) => (
  <StyledMenu {...props} data-test-id="menu" ref={ref} />
));

export const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export default HoveringToolbar;
