import { describe, it, expect } from 'vitest';
import {
  ContractorRequestSchema,
  SocialQualifyFormSchema,
} from './schemas';

describe('Schemas Validation', () => {
  describe('ContractorRequestSchema', () => {
    it('validates correct contractor request', () => {
      const data = {
        email: 'test@example.com',
        companySlug: 'test-company',
        companyName: 'Test Company',
      };
      expect(() => ContractorRequestSchema.parse(data)).not.toThrow();
    });

    it('rejects invalid email format', () => {
      const data = {
        email: 'invalid-email',
        companySlug: 'test-company',
        companyName: 'Test Company',
      };
      expect(() => ContractorRequestSchema.parse(data)).toThrow();
    });

    it('requires all fields', () => {
      const data = { email: 'test@example.com' };
      expect(() => ContractorRequestSchema.parse(data)).toThrow();
    });

    it('requires valid company slug', () => {
      const data = {
        email: 'test@example.com',
        companySlug: '',
        companyName: 'Test Company',
      };
      expect(() => ContractorRequestSchema.parse(data)).toThrow();
    });
  });

  describe('SocialQualifyFormSchema', () => {
    it('validates correct social qualify form', () => {
      const data = {
        email: 'test@example.com',
        phone: '1234567890',
        redditUsername: 'testuser',
      };
      expect(() => SocialQualifyFormSchema.parse(data)).not.toThrow();
    });

    it('rejects missing email', () => {
      const data = {
        phone: '1234567890',
        redditUsername: 'testuser',
      };
      expect(() => SocialQualifyFormSchema.parse(data)).toThrow();
    });

    it('rejects short phone number', () => {
      const data = {
        email: 'test@example.com',
        phone: '123',
        redditUsername: 'testuser',
      };
      expect(() => SocialQualifyFormSchema.parse(data)).toThrow();
    });

    it('allows optional social usernames', () => {
      const data = {
        email: 'test@example.com',
        phone: '1234567890',
        redditUsername: 'testuser',
        twitterUsername: 'optional',
      };
      expect(() => SocialQualifyFormSchema.parse(data)).not.toThrow();
    });
  });
});
