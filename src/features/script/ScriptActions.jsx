import { Editor } from "slate";

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
};
