import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { seoPlugin } from './seo-plugin';

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

// Яндекс Метрика добавляется в CSP, только если задан VITE_YM_ID.
function buildContentSecurityPolicy(withMetrika: boolean): string {
  const ym = withMetrika ? " https://mc.yandex.ru https://mc.yandex.com https://yastatic.net" : "";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    // Вебвизору нужны фреймы и воркеры с mc.yandex.ru и blob:.
    withMetrika ? "frame-src blob: https://mc.yandex.ru https://mc.yandex.com" : "frame-src 'none'",
    withMetrika ? "child-src blob: https://mc.yandex.ru https://mc.yandex.com" : "",
    // Cloudflare Web Analytics: скрипт вставляет сам Cloudflare, данные уходят на cloudflareinsights.com.
    `script-src 'self' https://static.cloudflareinsights.com${ym}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `img-src 'self' data: blob:${ym}`,
    `connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cloudflareinsights.com${ym}${withMetrika ? " wss://mc.yandex.ru wss://mc.yandex.com" : ""}`,
    "form-action 'self'",
  ].filter(Boolean).join("; ");
}

function contentSecurityPolicyPlugin(contentSecurityPolicy: string): Plugin {
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
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const csp = buildContentSecurityPolicy(Boolean(env.VITE_YM_ID));
  return {
  plugins: [react(), petfoodSplit(), contentSecurityPolicyPlugin(csp), seoPlugin()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames(chunkInfo) {
          const rawName = chunkInfo.name.replace(/^_+/, '');
          return `assets/${rawName}-[hash].js`;
        },
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
            return 'react';
          }
        },
      },
    },
  },
  };
});
