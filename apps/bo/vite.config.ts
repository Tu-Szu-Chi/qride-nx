/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      fs: {
        allow: ['..'],
      },
      proxy: {
        '/api/bo': {
          target: process.env.BO_PUBLIC_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/bo/, ''),
        },
      },
    },
  };
});
