import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'frontend',
    globals: true,
    environment: 'jsdom',
    include: ['client/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/frontend',
      include: ['client/**/*.{ts,tsx}'],
      exclude: [
        'client/**/*.test.{ts,tsx}',
        'client/**/*.spec.{ts,tsx}',
        'client/components/ui/**',
        'client/vite-env.d.ts',
      ],
      thresholds: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
      all: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
  },
});
