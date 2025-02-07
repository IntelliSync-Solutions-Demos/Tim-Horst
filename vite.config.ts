import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      ...Object.fromEntries(
        Object.keys(process.env).map((key) => [
          `import.meta.env.${key}`,
          JSON.stringify(process.env[key]),
        ])
      ),
    },
  };
});
