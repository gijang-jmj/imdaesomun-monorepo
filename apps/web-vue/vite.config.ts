import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  const env = loadEnv('production', process.cwd(), '');

  return {
    plugins: [vue(), vueDevTools(), svgLoader(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@imdaesomun/assets': fileURLToPath(
          new URL('../../packages/assets/src', import.meta.url)
        ),
        '@imdaesomun/shared': fileURLToPath(
          new URL('../../packages/shared/src', import.meta.url)
        ),
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
