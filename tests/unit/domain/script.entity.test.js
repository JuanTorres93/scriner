import { describe, it, expect } from 'vitest';
import { Script } from '../../../src/domain/script/Script.js';
import { Edit } from '../../../src/domain/edit/Edit.js';
import { EDIT_TYPES } from '../../../src/domain/edit/editTypes.js';
import { ValidationError } from '../../../src/domain/common/errors.js';

const validScriptWithNoEditsData = {
  id: 1,
  userId: 'u1',
  title: 'Test Script',
  content: 'Script content',
  createdAt: new Date('2025-01-01'),
};

const validEditData = {
  id: 1,
  scriptId: 1,
  type: EDIT_TYPES.SFX,
  userId: 'u1',
  changes: 'Initial content',
  createdAt: new Date('2025-01-01'),
};

describe('Script entity', () => {
  describe('creation', () => {
    it('creates a valid script with all properties', () => {
      const script = Script.create(validScriptWithNoEditsData);

      expect(script.id).toBe(1);
      expect(script.userId).toBe('u1');
      expect(script.title).toBe('Test Script');
      expect(script.content).toBe('Script content');
      expect(script.createdAt).toEqual(new Date('2025-01-01'));
      expect(Array.isArray(script.edits)).toBe(true);
      expect(script.edits.length).toBe(0);
    });

    it('creates a valid script with edits', () => {
      const edit1 = Edit.create(validEditData);
      const edit2 = Edit.create({
        ...validEditData,
        id: 2,
      });

      const scriptDataWithEdits = {
        ...validScriptWithNoEditsData,
        edits: [edit1, edit2],
      };

      const script = Script.create(scriptDataWithEdits);

      expect(script.id).toBe(1);
      expect(script.edits.length).toBe(2);
      expect(script.edits[0]).toBe(edit1);
      expect(script.edits[1]).toBe(edit2);
    });

    it('Throws error if edits is not an array of Edit objects', async () => {
      expect(() => {
        Script.create({
          ...validScriptWithNoEditsData,
          edits: 'not-an-array',
        });
      }).toThrow(ValidationError);

      expect(() => {
        Script.create({
          ...validScriptWithNoEditsData,
          edits: [123, 'string', null],
        });
      }).toThrow(ValidationError);
    });

    it('allows content to be undefined', () => {
      const scriptData = { ...validScriptWithNoEditsData };
      delete scriptData.content;

      expect(() => Script.create(scriptData)).not.toThrow();
    });

    it('throws ValidationError when required fields are missing', () => {
      expect(() => Script.create({})).toThrow(ValidationError);
      expect(() => Script.create({ id: '1' })).toThrow(ValidationError);
      expect(() => Script.create({ id: '1', createdAt: new Date() })).toThrow(
        ValidationError
      );
      expect(() =>
        Script.create({ id: '1', createdAt: new Date(), title: 'T' })
      ).toThrow(ValidationError);
    });

    it('throws ValidationError for invalid createdAt', () => {
      expect(() =>
        Script.create({
          ...validScriptWithNoEditsData,
          createdAt: 'invalid-date',
        })
      ).toThrow(ValidationError);

      expect(() =>
        Script.create({
          ...validScriptWithNoEditsData,
          createdAt: null,
        })
      ).toThrow(ValidationError);
    });
  });

  describe('update', () => {
    it('updates title and content', async () => {
      const script = Script.create(validScriptWithNoEditsData);
      const updatedData = {
        title: 'Updated Title',
        content: 'Updated content',
      };

      expect(script.title).not.toBe(updatedData.title);
      expect(script.content).not.toBe(updatedData.content);
      script.update(updatedData);
      expect(script.title).toBe(updatedData.title);
      expect(script.content).toBe(updatedData.content);
    });

    it('throws error if title or content are not string', async () => {
      expect(() => {
        const script = Script.create(validScriptWithNoEditsData);
        script.update({ title: 123 });
      }).toThrow();

      expect(() => {
        const script = Script.create(validScriptWithNoEditsData);
        script.update({ content: {} });
      }).toThrow();
    });

    it('updates id', async () => {
      const script = Script.create(validScriptWithNoEditsData);
      const newId = 2;

      expect(script.id).not.toBe(newId);
      script.update({ id: newId });
      expect(script.id).toBe(newId);
    });
  });
});
