import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'github-pages-hybrid-entry',
        transformIndexHtml(html, ctx) {
          // In Vite dev server mode, serve src/main.jsx for live development & HMR
          if (ctx && ctx.server) {
            return html
              .replace(
                /<script type="module" crossorigin src="\.\/assets\/main\.js"><\/script>/,
                '<script type="module" src="./src/main.jsx"></script>'
              )
              .replace(
                /<link rel="stylesheet" crossorigin href="\.\/assets\/main\.css">/,
                ''
              );
          }
          return html;
        },
        closeBundle() {
          // Keep root assets in sync so GitHub Pages can serve them directly
          try {
            const distAssets = path.resolve(__dirname, 'dist/assets');
            const rootAssets = path.resolve(__dirname, 'assets');
            if (fs.existsSync(distAssets)) {
              if (!fs.existsSync(rootAssets)) fs.mkdirSync(rootAssets, { recursive: true });
              const files = fs.readdirSync(distAssets);
              for (const file of files) {
                fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file));
                if (file.endsWith('.js')) {
                  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, 'app.js'));
                  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, 'index.js'));
                }
                if (file.endsWith('.css')) {
                  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, 'app.css'));
                  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, 'index.css'));
                }
              }
            }
          } catch (e) {
            console.error('Asset sync error', e);
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/main.jsx'),
        },
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
