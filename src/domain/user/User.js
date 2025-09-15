import { ValidationError } from '../common/errors';

export class User {
  constructor({ id, name, email, createdAt }) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._createdAt = createdAt;
  }

  static create({ id, name, email, createdAt }) {
    if (!name) throw new ValidationError('User: name is required');
    if (!email) throw new ValidationError('User: email is required');
    if (!createdAt) throw new ValidationError('User: createdAt is required');

    if (!(createdAt instanceof Date))
      throw new ValidationError('createdAt must be a Date');

    return new User({ id, name, email, createdAt });
  }

  _updateName(name) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new ValidationError(
        'name is required and must be a non-empty string'
      );
    }
    this._name = name;
  }

  update({ name }) {
    if (name) this._updateName(name);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get createdAt() {
    return this._createdAt;
  }
}
