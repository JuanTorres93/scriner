//import Button from '../../ui/Button';
//import { useEdits } from '../edit/hooks/useEdits';

/**
 * Button that converts a Slate.js rich-text document into plain text
 * and lets the user download it as a .txt file for teleprompter use.
 */
function ExportScriptButton({ script }) {
  //const { edits } = useEdits(script?.id);

  //// No script loaded → nothing to export
  //if (!script) return null;

  //const handleExport = () => {
  //  // Guard: browser only
  //  if (typeof document === 'undefined') return;

  //  const text = parseSlateToPlainText(script.content, edits);

  //  // Usa data URL en lugar de Blob/URL.createObjectURL
  //  const dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);

  //  const a = document.createElement('a');
  //  a.href = dataUrl;
  //  a.download = sanitizeFilename(`${script.title || 'script'}.txt`);
  //  document.body.appendChild(a);
  //  a.click();
  //  a.remove();
  //};

  //return (
  //  <Button type="secondary" onClick={handleExport}>
  //    Exportar a teleprompter
  //  </Button>
  //);

  return null;
}

export default ExportScriptButton;

///**
// * Replaces invalid filename characters with underscores.
// * Prevents issues on Windows, macOS, and Linux.
// */
//function sanitizeFilename(name) {
//  return String(name || 'archivo.txt').replace(/[<>:"/\\|?*]/g, '_');
//}
//
///* -------------------------------------------------------------------------- */
///*                           parseSlateToPlainText                            */
///* -------------------------------------------------------------------------- */
///**
// * Converts a Slate.js rich-text structure into plain text.
// * Handles emotions (custom tags) and formatting between paragraphs.
// *
// * @param {any} content - Slate JSON or serialized string
// * @param {Array} scriptEdits - list of emotion mappings (id → label)
// * @param {Object} options - optional configuration for separators and trimming
// * @returns {string} plain text ready for teleprompter export
// */
//function parseSlateToPlainText(
//  content,
//  scriptEdits = [],
//  {
//    paragraphSeparator = '\n\n',
//    trimLines = true,
//    blockTypesAsParagraph = new Set([
//      'paragraph',
//      'heading',
//      'quote',
//      'list-item',
//    ]),
//  } = {}
//) {
//  const nodes = typeof content === 'string' ? JSON.parse(content) : content;
//
//  /* ---------------------- Build a map of editId → label ---------------------- */
//  const editMap = new Map();
//  for (const e of scriptEdits || []) {
//    const key = String(e?.editId ?? e?.id ?? e?.ID ?? e?.Id ?? '');
//    const val =
//      e?.content ??
//      e?.text ??
//      e?.title ??
//      e?.label ??
//      e?.name ??
//      e?.value ??
//      '';
//    if (key && val) editMap.set(key, String(val));
//  }
//
//  /* ------------------------- Helper: emotion → label ------------------------ */
//  const emotionToLabel = (emo) => {
//    if (!emo) return '';
//    if (typeof emo === 'string' || typeof emo === 'number') return String(emo);
//
//    const key =
//      emo.editId ?? emo.id ?? emo.ID ?? emo.Id ?? emo.value ?? emo.slug;
//    if (key != null) {
//      const label = editMap.get(String(key));
//      if (label) return label;
//    }
//
//    return (
//      emo.label ??
//      emo.name ??
//      emo.title ??
//      emo.value ??
//      emo.type ??
//      emo.slug ??
//      ''
//    );
//  };
//
//  /* ---------------------- Collect all text leaves recursively ---------------------- */
//  const collectLeaves = (node, acc) => {
//    if (!node || typeof node !== 'object') return;
//    if ('text' in node) {
//      acc.push({ text: node.text || '', emotion: node.emotion || null });
//      return;
//    }
//    const kids = Array.isArray(node.children) ? node.children : [];
//    for (const k of kids) collectLeaves(k, acc);
//  };
//
//  /**
//   * Serialize a single paragraph to plain text
//   * and detect its first emotion (if any).
//   */
//  const serializeParagraphAndEmotion = (node) => {
//    const leaves = [];
//    collectLeaves(node, leaves);
//
//    let paragraphEmotion = '';
//    for (const leaf of leaves) {
//      const t = (leaf.text || '').trim();
//      if (t && leaf.emotion) {
//        paragraphEmotion = emotionToLabel(leaf.emotion) || '';
//        if (paragraphEmotion) break;
//      }
//    }
//
//    const plain = leaves.map((l) => l.text || '').join('');
//    return { plain, paragraphEmotion };
//  };
//
//  const arr = Array.isArray(nodes) ? nodes : [nodes];
//  const lines = [];
//  let prevEmotion = '';
//
//  /* ------------------------- Iterate over all blocks ------------------------ */
//  for (const n of arr) {
//    const isParagraphLike =
//      !n?.type ||
//      blockTypesAsParagraph.has(n.type) ||
//      Array.isArray(n?.children);
//    if (!isParagraphLike) continue;
//
//    const { plain, paragraphEmotion } = serializeParagraphAndEmotion(n);
//    const line = trimLines ? plain.replace(/[ \t]+/g, ' ').trim() : plain;
//
//    if (line === '') {
//      lines.push('');
//      continue;
//    }
//
//    // If the paragraph has an emotion, insert it only when it changes
//    if (paragraphEmotion) {
//      const emotionUpper = paragraphEmotion.toUpperCase();
//      if (emotionUpper !== prevEmotion) {
//        // Add 4 line breaks before and after for teleprompter clarity
//        const tagBlock = `\n\n\n\n>>>> ${emotionUpper} <<<<\n\n\n\n`;
//        lines.push(tagBlock + line);
//        prevEmotion = emotionUpper;
//      } else {
//        lines.push(line);
//      }
//    } else {
//      prevEmotion = '';
//      lines.push(line);
//    }
//  }
//
//  /* ---------------------- Compact consecutive empty lines -------------------- */
//  const compacted = lines.filter((l, i, a) => l !== '' || a[i - 1] !== '');
//  return compacted.join(paragraphSeparator).trim();
//}
