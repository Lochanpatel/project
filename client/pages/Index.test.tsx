import { describe, it, expect } from 'vitest';

describe('Index Page', () => {
  it('module exports default', async () => {
    const Index = await import('./Index');
    expect(Index.default).toBeTruthy();
  });

  it('is a React component', async () => {
    const { default: Index } = await import('./Index');
    expect(typeof Index).toBe('function');
  });
});
