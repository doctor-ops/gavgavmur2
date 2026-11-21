import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
  findStaticPage,
  type PageMeta,
} from '@/seo/meta';

interface SeoProps {
  meta: Pick<PageMeta, 'path' | 'title' | 'description' | 'image'>;
  noindex?: boolean;
  jsonLd?: object;
}

export function Seo({ meta, noindex, jsonLd }: SeoProps) {
  const url = canonicalUrl(meta.path);
  const image = absoluteUrl(meta.image ?? DEFAULT_OG_IMAGE);
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

// Мета-теги для статических маршрутов. Страницы пород ставят их сами.
export function RouteSeo() {
  const { pathname } = useLocation();
  const meta = findStaticPage(pathname);
  if (!meta || meta.path === '/app') return null;
  return <Seo meta={meta} />;
}
