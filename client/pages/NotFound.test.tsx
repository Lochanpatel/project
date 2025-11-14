import { describe, it, expect } from 'vitest';

describe('NotFound Page', () => {
  it('module exports default', async () => {
    const NotFound = await import('./NotFound');
    expect(NotFound.default).toBeTruthy();
  });

  it('is a React component', async () => {
    const { default: NotFound } = await import('./NotFound');
    expect(typeof NotFound).toBe('function');
  });
});
