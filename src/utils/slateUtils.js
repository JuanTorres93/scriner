import { Editor, Range, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export function resetEditorContent(editor, content) {
  try {
    const parsed = JSON.parse(content || "[]");

    const nodes = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.children)
      ? parsed.children
      : null;

    const validNodes =
      nodes && nodes.length > 0
        ? nodes
        : [
            {
              type: "paragraph",
              children: [{ text: "Pega tu guion aquí" }],
            },
          ];

    Transforms.deselect(editor); // Clear any selection
    editor.children = validNodes; // Apply new content
    ReactEditor.focus(editor); // refocus
  } catch (e) {
    Transforms.deselect(editor);
    editor.children = [
      {
        type: "paragraph",
        children: [{ text: "Pega tu guion aquí" }],
      },
    ];
  }
}

// Get all marks in the current selection
export function getMarksInSelection(editor) {
  const { selection } = editor;
  if (!selection || Range.isCollapsed(selection)) return [];

  // Extract all text nodes in the selection
  const texts = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n) => Text.isText(n),
    })
  );

  // Collect all found marks
  const marks = texts.map(([node]) => {
    // node: { text: "foo", bold: true, italic: true, ... }
    // Exclude the "text" property (not a mark)
    const { text, ...rest } = node;
    return rest;
  });

  // filter empty marks
  return marks.filter((mark) => Object.keys(mark).length > 0);
}
