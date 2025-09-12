import { Edit } from "../../../domain/edit/Edit";

export function toEntity(row) {
  if (!row) return null;

  return new Edit({
    id: row.id,
    content: row.content,
    createdAt: new Date(row.created_at),
    type: row.type,
    isDone: row.isDone,
    scriptId: row.scriptId,
  });
}

export function toRow(entityOrPatch) {
  if (!entityOrPatch) return null;

  const { content, type, isDone, scriptId } = entityOrPatch;

  return { content, type, isDone, scriptId };
}
