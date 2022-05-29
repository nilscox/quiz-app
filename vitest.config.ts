import reactJsx from 'vite-react-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
  },
  plugins: [tsconfigPaths(), reactJsx()],
});
