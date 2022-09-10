import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

process.env.NODE_ENV = 'test';

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    reporters: 'verbose',
    watch: false,
  },
  plugins: [tsconfigPaths(), react()],
});
