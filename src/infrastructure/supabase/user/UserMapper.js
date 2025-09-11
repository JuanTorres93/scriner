import { User } from "../../../domain/user/User.js";

export function toEntity(row) {
  if (!row) return null;

  return new User({
    id: row.id,
    name: row.name,
    email: row.email,
  });
}

export function toRow(entityOrPatch) {
  if (!entityOrPatch) return null;

  const { name, email } = entityOrPatch;

  return { name, email };
}
