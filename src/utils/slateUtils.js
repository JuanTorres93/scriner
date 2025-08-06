import { Transforms } from "slate";
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
