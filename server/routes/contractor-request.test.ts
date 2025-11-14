import { describe, it, expect } from 'vitest';
import { ContractorRequestSchema } from '../../shared/schemas';

describe('Contractor Request Route - Unit Tests', () => {
  it('should validate request parameters', () => {
    const validData = {
      email: 'test@example.com',
      companySlug: 'test-company',
      companyName: 'Test Company',
    };

    expect(() => ContractorRequestSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid email', () => {
    const invalidData = {
      email: 'not-an-email',
      companySlug: 'test-company',
      companyName: 'Test Company',
    };

    expect(() => ContractorRequestSchema.parse(invalidData)).toThrow();
  });

  it('should reject missing required fields', () => {
    const incompleteData = {
      email: 'test@example.com',
    };

    expect(() => ContractorRequestSchema.parse(incompleteData)).toThrow();
  });

  it('should accept all valid fields', () => {
    const data = {
      email: 'contractor@example.com',
      companySlug: 'awesome-company',
      companyName: 'Awesome Company Inc',
    };

    expect(() => ContractorRequestSchema.parse(data)).not.toThrow();
  });
});
