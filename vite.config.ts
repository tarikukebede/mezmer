import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createWorkspaceAliases } from './config/aliases';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: createWorkspaceAliases(__dirname),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
