import { describe, it, expect } from 'vitest';
import { Script } from '../../../src/domain/script/Script.js';
import { ValidationError } from '../../../src/domain/common/errors.js';

describe('Script entity', () => {
  const validScriptData = {
    id: '1',
    userId: 'u1',
    title: 'Test Script',
    content: 'Script content',
    createdAt: new Date('2025-01-01'),
  };

  describe('creation', () => {
    it('creates a valid script with all properties', () => {
      const script = Script.create(validScriptData);

      expect(script.id).toBe('1');
      expect(script.userId).toBe('u1');
      expect(script.title).toBe('Test Script');
      expect(script.content).toBe('Script content');
      expect(script.createdAt).toEqual(new Date('2025-01-01'));
    });

    it('allows content to be undefined', () => {
      const scriptData = { ...validScriptData };
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
          ...validScriptData,
          createdAt: 'invalid-date',
        })
      ).toThrow(ValidationError);

      expect(() =>
        Script.create({
          ...validScriptData,
          createdAt: null,
        })
      ).toThrow(ValidationError);
    });
  });

  describe('update', () => {
    it('updates title and content', async () => {
      const script = Script.create(validScriptData);
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
        const script = Script.create(validScriptData);
        script.update({ title: 123 });
      }).toThrow();

      expect(() => {
        const script = Script.create(validScriptData);
        script.update({ content: {} });
      }).toThrow();
    });
  });
});
