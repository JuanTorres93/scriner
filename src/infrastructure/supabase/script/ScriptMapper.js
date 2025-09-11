import { Script } from "../../../domain/script/Script.js";

export function toEntity(row) {
  if (!row) return null;

  return new Script({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  });
}

export function toRow(entityOrPatch) {
  if (!entityOrPatch) return null;

  const { user_id, title, content } = entityOrPatch;

  return { user_id, title, content };
}
