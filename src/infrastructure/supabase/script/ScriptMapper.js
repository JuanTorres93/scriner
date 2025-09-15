import { Script } from '../../../domain/script/Script.js';

export function toEntity(row) {
  if (!row) return null;

  return new Script({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    content: row.content,
    createdAt: new Date(row.created_at),
  });
}

export function toRow(entityOrPatch) {
  if (!entityOrPatch) return null;

  const { userId, title, content } = entityOrPatch;

  return { user_id: userId, title, content };
}
