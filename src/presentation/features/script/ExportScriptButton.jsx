import Button from '../../ui/Button';
import { useEdits } from '../edit/hooks/useEdits';

function ExportScriptButton({ script }) {
  const { edits } = useEdits(script?.id);

  if (!script) {
    return null;
  }

  return (
    <Button
      type="secondary"
      onClick={() => {
        const text = parseSlateToPlainText(script.content, edits);
        // TODO DELETE THESE DEBUG LOGS
        console.log('text');
        console.log(text);
      }}
    >
      Exportar a teleprompter
    </Button>
  );
}

export default ExportScriptButton;

function parseSlateToPlainText(
  content,
  scriptEdits = [],
  {
    paragraphSeparator = '\n\n',
    trimLines = true,
    blockTypesAsParagraph = new Set([
      'paragraph',
      'heading',
      'quote',
      'list-item',
    ]),
  } = {}
) {
  const nodes = typeof content === 'string' ? JSON.parse(content) : content;

  // Crear mapa: editId/id -> content (nombre de la emoción)
  const editMap = new Map();
  for (const e of scriptEdits || []) {
    const key = String(e?.editId ?? e?.id ?? e?.ID ?? e?.Id ?? '');
    const val =
      e?.content ??
      e?.text ??
      e?.title ??
      e?.label ??
      e?.name ??
      e?.value ??
      '';
    if (key && val) editMap.set(key, String(val));
  }

  const emotionToLabel = (emo) => {
    if (!emo) return '';
    if (typeof emo === 'string' || typeof emo === 'number') return String(emo);
    const key =
      emo.editId ?? emo.id ?? emo.ID ?? emo.Id ?? emo.value ?? emo.slug;
    if (key != null) {
      const label = editMap.get(String(key));
      if (label) return label;
    }
    return (
      emo.label ??
      emo.name ??
      emo.title ??
      emo.value ??
      emo.type ??
      emo.slug ??
      ''
    );
  };

  // Recoge hojas de texto de un nodo
  const collectLeaves = (node, acc) => {
    if (!node || typeof node !== 'object') return;
    if ('text' in node) {
      acc.push({ text: node.text || '', emotion: node.emotion || null });
      return;
    }
    const kids = Array.isArray(node.children) ? node.children : [];
    for (const k of kids) collectLeaves(k, acc);
  };

  // Devuelve texto plano del párrafo + primera emoción real
  const serializeParagraphAndEmotion = (node) => {
    const leaves = [];
    collectLeaves(node, leaves);

    let paragraphEmotion = '';
    for (const leaf of leaves) {
      const t = (leaf.text || '').trim();
      if (t && leaf.emotion) {
        paragraphEmotion = emotionToLabel(leaf.emotion) || '';
        if (paragraphEmotion) break;
      }
    }

    const plain = leaves.map((l) => l.text || '').join('');
    return { plain, paragraphEmotion };
  };

  const arr = Array.isArray(nodes) ? nodes : [nodes];
  const lines = [];
  let prevEmotion = '';

  for (const n of arr) {
    const isParagraphLike =
      !n?.type ||
      blockTypesAsParagraph.has(n.type) ||
      Array.isArray(n?.children);
    if (!isParagraphLike) continue;

    const { plain, paragraphEmotion } = serializeParagraphAndEmotion(n);
    const line = trimLines ? plain.replace(/[ \t]+/g, ' ').trim() : plain;

    if (line === '') {
      lines.push('');
      continue;
    }

    if (paragraphEmotion) {
      const emotionUpper = paragraphEmotion.toUpperCase();
      if (emotionUpper !== prevEmotion) {
        // etiqueta con 4 saltos antes y después
        const tagBlock = `\n\n\n\n>>>> ${emotionUpper} <<<<\n\n\n\n`;
        lines.push(tagBlock + line);
        prevEmotion = emotionUpper;
      } else {
        lines.push(line);
      }
    } else {
      prevEmotion = '';
      lines.push(line);
    }
  }

  const compacted = lines.filter((l, i, a) => l !== '' || a[i - 1] !== '');
  return compacted.join(paragraphSeparator).trim();
}
