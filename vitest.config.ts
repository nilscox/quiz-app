import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    watch: false,
  },
  plugins: [tsconfigPaths(), react()],
});
