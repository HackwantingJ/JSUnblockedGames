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
                /<script type="module" crossorigin src="\.\/assets\/main\.js[^"]*"><\/script>/,
                '<script type="module" src="./src/main.jsx"></script>'
              )
              .replace(
                /<link rel="stylesheet" crossorigin href="\.\/assets\/main\.css[^"]*">/,
                ''
              );
          }
          return html;
        },
        closeBundle() {
          // Keep root and dist assets, games, data, index.html, and .nojekyll in sync for GitHub Pages
          try {
            const distDir = path.resolve(__dirname, 'dist');
            const distAssets = path.resolve(__dirname, 'dist/assets');
            const rootAssets = path.resolve(__dirname, 'assets');
            
            if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

            // Copy index.html and 404.html to dist and root
            const indexHtmlSrc = path.resolve(__dirname, 'index.html');
            if (fs.existsSync(indexHtmlSrc)) {
              fs.copyFileSync(indexHtmlSrc, path.join(distDir, 'index.html'));
              fs.copyFileSync(indexHtmlSrc, path.join(distDir, '404.html'));
              fs.copyFileSync(indexHtmlSrc, path.resolve(__dirname, '404.html'));
            }

            // Copy .nojekyll to dist
            const nojekyllSrc = path.resolve(__dirname, '.nojekyll');
            if (fs.existsSync(nojekyllSrc)) {
              fs.copyFileSync(nojekyllSrc, path.join(distDir, '.nojekyll'));
            }

            // Sync assets
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

            // Sync games folder to root and dist
            const publicGames = path.resolve(__dirname, 'public/games');
            const rootGames = path.resolve(__dirname, 'games');
            const distGames = path.resolve(distDir, 'games');
            if (fs.existsSync(publicGames)) {
              if (!fs.existsSync(rootGames)) fs.mkdirSync(rootGames, { recursive: true });
              if (!fs.existsSync(distGames)) fs.mkdirSync(distGames, { recursive: true });
              for (const g of fs.readdirSync(publicGames)) {
                fs.copyFileSync(path.join(publicGames, g), path.join(rootGames, g));
                fs.copyFileSync(path.join(publicGames, g), path.join(distGames, g));
              }
            }

            // Sync data folder to root and dist
            const publicData = path.resolve(__dirname, 'public/data');
            const rootData = path.resolve(__dirname, 'data');
            const distData = path.resolve(distDir, 'data');
            if (fs.existsSync(publicData)) {
              if (!fs.existsSync(rootData)) fs.mkdirSync(rootData, { recursive: true });
              if (!fs.existsSync(distData)) fs.mkdirSync(distData, { recursive: true });
              for (const d of fs.readdirSync(publicData)) {
                fs.copyFileSync(path.join(publicData, d), path.join(rootData, d));
                fs.copyFileSync(path.join(publicData, d), path.join(distData, d));
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
