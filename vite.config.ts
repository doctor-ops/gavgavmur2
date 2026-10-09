import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const petfoodFile = fileURLToPath(new URL('./src/data/petfood_ready.json', import.meta.url));

type FoodRow = {
  id?: string;
  brand?: string;
  line?: string;
  name?: string;
  search_tags?: string;
  ingredients?: string;
};

function petfoodSplit(): Plugin {
  let cache: { mtimeMs: number; index: string; compositions: string } | null = null;

  const read = () => {
    const stat = fs.statSync(petfoodFile);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache;
    const foods = JSON.parse(fs.readFileSync(petfoodFile, 'utf8')) as FoodRow[];
    const index = foods.map((food) => {
      const row: Record<string, string> = {
        id: food.id ?? '',
        brand: food.brand ?? '',
        name: food.name ?? '',
      };
      if (food.line) row.line = food.line;
      if (food.search_tags) row.search_tags = food.search_tags;
      return row;
    });
    const compositions: Record<string, string> = {};
    for (const food of foods) {
      const text = food.ingredients?.trim() ?? '';
      if (food.id && text) compositions[food.id] = text;
    }
    cache = {
      mtimeMs: stat.mtimeMs,
      index: `export default ${JSON.stringify(index)}`,
      compositions: `export default ${JSON.stringify(compositions)}`,
    };
    return cache;
  };

  return {
    name: 'petfood-split',
    buildStart() {
      this.addWatchFile(petfoodFile);
    },
    resolveId(id) {
      if (id === 'virtual:petfood-index' || id === 'virtual:petfood-compositions') {
        return `\0${id}`;
      }
    },
    load(id) {
      if (id === '\0virtual:petfood-index') return read().index;
      if (id === '\0virtual:petfood-compositions') return read().compositions;
    },
  };
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://images.dogapi.dog https://upload.wikimedia.org",
  "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  "form-action 'self'",
].join('; ');

function contentSecurityPolicyPlugin(): Plugin {
  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml(html) {
      const meta = `  <meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}" />\n`;
      return html.replace('<head>', `<head>\n${meta}`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), petfoodSplit(), contentSecurityPolicyPlugin()],
  base: '/gavgavmur2/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
            return 'react';
          }
        },
      },
    },
  },
});
