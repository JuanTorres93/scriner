import { ValidationError } from '../common/errors';
import { EDIT_TYPES } from './editTypes';

export class Edit {
  constructor({ id, content, createdAt, type, isDone = false, scriptId }) {
    this._id = id;
    this._content = content;
    this._type = type;
    this._createdAt = createdAt;
    this._isDone = isDone;
    this._scriptId = scriptId;
  }

  static create({
    id,
    content = '',
    createdAt,
    type,
    isDone = false,
    scriptId,
  }) {
    if (!id || !createdAt || !type || !scriptId) {
      throw new ValidationError('Missing required fields');
    }

    if (!Object.values(EDIT_TYPES).includes(type))
      throw new ValidationError('Invalid edit type');

    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime()))
      throw new ValidationError('Invalid createdAt');

    return new Edit({ id, content, createdAt, type, isDone, scriptId });
  }

  _updateContent(content) {
    if (content && typeof content !== 'string') {
      throw new ValidationError('content must be a string');
    }

    this._content = content || '';
  }

  _updateIsDone(isDone) {
    if (typeof isDone !== 'boolean') {
      throw new ValidationError('isDone must be a boolean');
    }

    this._isDone = isDone;
  }

  _updateType(type) {
    if (!Object.values(EDIT_TYPES).includes(type)) {
      throw new ValidationError('Invalid edit type');
    }

    this._type = type;
  }

  update({ content, isDone, type }) {
    if (content !== undefined) this._updateContent(content);
    if (isDone !== undefined) this._updateIsDone(isDone);
    if (type !== undefined) this._updateType(type);
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._content;
  }

  get type() {
    return this._type;
  }

  get createdAt() {
    return this._createdAt;
  }

  get isDone() {
    return this._isDone;
  }

  get scriptId() {
    return this._scriptId;
  }
}
