import { Editor, Transforms, Text } from "slate";

export const ScriptActions = {
  isMarkActive(editor, type) {
    const marks = Editor.marks(editor);
    return marks?.[type] ? true : false;
  },

  addMark(editor, type, editId) {
    Editor.addMark(editor, type, {
      editId,
    });
  },

  removeMark(editor, type) {
    Editor.removeMark(editor, type);
  },

  removeEditMarkByEditId(editor, type, targetEditId) {
    for (const [node, path] of Editor.nodes(editor, {
      at: [], // Whole document
      match: Text.isText,
    })) {
      // Check if the node has the type and editId we are looking for
      if (node[type] && node[type].editId === targetEditId) {
        // Remove the 'type' property (e.g. 'sfx') only from that node
        Transforms.unsetNodes(editor, type, { at: path });
      }
    }
  },
};
