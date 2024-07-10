import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./_fonts.scss", "./_helpers.scss", "./_sizes.scss";`,
        includePaths: ['./src/styles'],
      },
    },
  },
  plugins: [react(), dynamicImport()],
});
