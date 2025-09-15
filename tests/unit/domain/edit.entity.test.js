import { describe, it, expect } from 'vitest';
import { Edit } from '../../../src/domain/edit/Edit.js';
import { EDIT_TYPES } from '../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../src/domain/common/errors.js';

describe('Edit entity', () => {
  const validEditData = {
    id: '1',
    content: 'Edit content',
    createdAt: new Date('2025-01-01'),
    type: EDIT_TYPES.SFX,
    isDone: false,
    scriptId: 's1',
  };

  describe('creation', () => {
    it('creates a valid edit with all properties', () => {
      const edit = Edit.create(validEditData);

      expect(edit.id).toBe('1');
      expect(edit.content).toBe('Edit content');
      expect(edit.createdAt).toEqual(new Date('2025-01-01'));
      expect(edit.type).toBe(EDIT_TYPES.SFX);
      expect(edit.isDone).toBe(false);
      expect(edit.scriptId).toBe('s1');
    });

    it('throws ValidationError for invalid edit type', () => {
      expect(() =>
        Edit.create({
          ...validEditData,
          type: 'invalid-type',
        })
      ).toThrow(ValidationError);
    });

    it('throws ValidationError when required fields are missing', () => {
      expect(() => Edit.create({})).toThrow(ValidationError);
      expect(() => Edit.create({ id: '1' })).toThrow(ValidationError);
      expect(() => Edit.create({ id: '1', scriptId: 's1' })).toThrow(
        ValidationError
      );
    });

    it('accepts all valid edit types', () => {
      Object.values(EDIT_TYPES).forEach((type) => {
        expect(() =>
          Edit.create({
            ...validEditData,
            type,
          })
        ).not.toThrow();
      });
    });

    it('defaults isDone to false when not provided', () => {
      const editData = { ...validEditData };
      delete editData.isDone;

      const edit = Edit.create(editData);
      expect(edit.isDone).toBe(false);
    });

    it('accepts boolean values for isDone', () => {
      const doneEdit = Edit.create({
        ...validEditData,
        isDone: true,
      });
      expect(doneEdit.isDone).toBe(true);

      const notDoneEdit = Edit.create({
        ...validEditData,
        isDone: false,
      });
      expect(notDoneEdit.isDone).toBe(false);
    });
  });

  describe('updates', () => {
    it('updates content', async () => {
      const edit = Edit.create(validEditData);
      edit.update({ content: 'Updated content' });
      expect(edit.content).toBe('Updated content');
    });

    it('updates type', async () => {
      const edit = Edit.create(validEditData);
      edit.update({ type: EDIT_TYPES.BROLL });
      expect(edit.type).toBe(EDIT_TYPES.BROLL);
    });

    it('updates isDone', async () => {
      const edit = Edit.create(validEditData);

      edit.update({ isDone: true });
      expect(edit.isDone).toBe(true);
    });

    it('throws ValidationError for invalid type update', async () => {
      const edit = Edit.create(validEditData);
      expect(() => edit.update({ type: 'invalid-type' })).toThrow(
        ValidationError
      );
    });
  });
});
