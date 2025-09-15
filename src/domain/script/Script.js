import { ValidationError } from '../common/errors';

export class Script {
  constructor({ id, content, createdAt, title, userId }) {
    this._id = id;
    this._content = content;
    this._createdAt = createdAt;
    this._title = title;
    this._userId = userId;
  }

  static create({ id, content = '', createdAt, title, userId }) {
    if (!id || !createdAt || !title || !userId)
      throw new ValidationError('Missing required fields');

    if (!(createdAt instanceof Date) || isNaN(createdAt))
      throw new ValidationError('createdAt must be a valid date');

    return new Script({ id, content, createdAt, title, userId });
  }

  _updateTitle(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new ValidationError(
        'title is required and must be a non-empty string'
      );
    }
    this._title = title;
  }

  _updateContent(content) {
    if (content && typeof content !== 'string') {
      throw new ValidationError('content must be a string');
    }
    this._content = content || '';
  }

  update({ title, content }) {
    if (title) this._updateTitle(title);
    if (content) this._updateContent(content);
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._content;
  }

  get createdAt() {
    return this._createdAt;
  }

  get title() {
    return this._title;
  }

  get userId() {
    return this._userId;
  }
}
