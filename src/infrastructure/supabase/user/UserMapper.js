import { User } from "../../../domain/user/User.js";

export function toEntity(row) {
  if (!row) return null;

  return new User({
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    avatar: row.avatar || "",
    createdAt: row.created_at ? new Date(row.created_at) : new Date(),
  });
}

export function toRow(entityOrPatch) {
  if (!entityOrPatch) return null;

  const result = {};

  if (entityOrPatch.id !== undefined) result.id = entityOrPatch.id;
  if (entityOrPatch.fullName !== undefined)
    result.full_name = entityOrPatch.fullName;
  if (entityOrPatch.email !== undefined) result.email = entityOrPatch.email;
  if (entityOrPatch.avatar !== undefined) result.avatar = entityOrPatch.avatar;
  if (entityOrPatch.createdAt !== undefined)
    result.created_at = entityOrPatch.createdAt;

  return result;
}
