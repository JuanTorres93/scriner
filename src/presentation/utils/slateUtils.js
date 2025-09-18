import { Editor, Range, Text, Transforms } from 'slate';

export function resetEditorContent(editor, content) {
  try {
    const parsed = JSON.parse(content || '[]');

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
              type: 'paragraph',
              children: [{ text: 'Pega tu guion aquí' }],
            },
          ];

    Transforms.deselect(editor); // Clear any selection
    editor.children = validNodes; // Apply new content
    editor.history = { redos: [], undos: [] }; // Clear history
    // ReactEditor.focus(editor); // refocus
  } catch (e) {
    Transforms.deselect(editor);
    editor.children = [
      {
        type: 'paragraph',
        children: [{ text: 'Pega tu guion aquí' }],
      },
    ];
  }
}

function _getMarks(editor, at = []) {
  // DOC: at = [] means the entire document

  // Extract all text nodes in the selection
  const texts = Array.from(
    Editor.nodes(editor, {
      at,
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

// Get all marks in the current selection
export function getMarksInSelection(editor, type = null) {
  const { selection } = editor;
  if (!selection || Range.isCollapsed(selection)) return [];

  const marks = _getMarks(editor, selection);

  if (type) return marks.find((mark) => mark[type] !== undefined);

  return marks;
}

export function getMarksInDocument(editor, type = null) {
  const marks = _getMarks(editor);

  if (type) return marks.find((mark) => mark[type] !== undefined);

  return marks;
}

export function handleUpdateContent({
  editor,
  script,
  isUpdating,
  updateScript,
}) {
  const newContent = JSON.stringify(editor.children);
  if (!script?.id || !newContent || isUpdating) return;
  if (newContent === script?.content) return;
  updateScript({ id: script?.id, data: { content: newContent } });
}
