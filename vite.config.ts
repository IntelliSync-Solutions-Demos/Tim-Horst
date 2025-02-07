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
      'import.meta.env.VITE_UPLOADTHING_API_KEY': JSON.stringify(env.VITE_UPLOADTHING_API_KEY || ''),
      'import.meta.env.VITE_UPLOADTHING_TOKEN': JSON.stringify(env.VITE_UPLOADTHING_TOKEN || ''),
      'import.meta.env.VITE_ADMIN_USERNAME': JSON.stringify(env.VITE_ADMIN_USERNAME || ''),
      'import.meta.env.VITE_ADMIN_PASSWORD': JSON.stringify(env.VITE_ADMIN_PASSWORD || '')
    },
  };
});
