import { Helmet } from '@dr.pogodin/react-helmet';

export default function SEO({
  title = 'EditorMind — Planifica vídeos sin caos',
  description = 'Crea y organiza tus guiones con claridad. Reduce el tiempo de edición y aumenta la calidad.',
  canonical = 'https://www.editormind.com/',
  url = 'https://www.editormind.com/',
  image = 'https://www.editormind.com/og-image.jpg',
  locale = 'es_ES',
  siteName = 'EditorMind',
  robots = 'index,follow',
  jsonLd = null,
}) {
  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteName,
    applicationCategory: 'Multimedia',
    operatingSystem: 'Web',
    url,
    image,
    description,
  };

  const ld = jsonLd || defaultJsonLd;

  return (
    <Helmet>
      <html lang="es" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
}
