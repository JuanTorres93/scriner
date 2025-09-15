import { describe, it, expect } from 'vitest';
import { User } from '../../../src/domain/user/User.js';
import { ValidationError } from '../../../src/domain/common/errors.js';

describe('User Entity', () => {
  const validUserData = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2023-01-01'),
  };

  describe('creation', () => {
    it('should create a User with valid data', () => {
      const user = User.create(validUserData);

      expect(user.id).toBe(validUserData.id);
      expect(user.name).toBe(validUserData.name);
      expect(user.email).toBe(validUserData.email);
      expect(user.createdAt).toBe(validUserData.createdAt);
    });

    it('error if createdAt is not date', () => {
      expect(() => {
        User.create({
          ...validUserData,
          createdAt: undefined,
        });
      }).toThrow(ValidationError);
    });
  });

  describe('updates', () => {
    it('should update user name', () => {
      const user = User.create(validUserData);
      user.update({ name: 'Jane Doe' });
      expect(user.name).toBe('Jane Doe');
    });
  });
});
