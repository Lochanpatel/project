import { describe, it, expect, beforeEach } from 'vitest';

describe('App Initialization', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('has root element in DOM', () => {
    const root = document.getElementById('root');
    expect(root).toBeTruthy();
  });

  it('QueryClient is available', () => {
    // Verify that react-query is properly installed
    const { QueryClient } = require('@tanstack/react-query');
    expect(() => new QueryClient()).not.toThrow();
  });

  it('React Router BrowserRouter is available', () => {
    const { BrowserRouter } = require('react-router-dom');
    expect(BrowserRouter).toBeTruthy();
  });

  it('AuthProvider context is available', async () => {
    const { AuthProvider } = await import('./hooks/useAuth');
    expect(AuthProvider).toBeTruthy();
  });
});
