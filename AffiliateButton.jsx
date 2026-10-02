import { Helmet } from 'react-helmet-async'

import { SITE_URL as SITE } from '../config/site'
const NAME = 'SecureHub'

export default function Seo({ title, description, path = '/', jsonLd = null, image = '/og-image.jpg' }) {
  const url = SITE + path
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE + image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

export function faqJsonLd(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }
}

export function reviewJsonLd(item, categoryPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Product', name: item.name },
    reviewRating: { '@type': 'Rating', ratingValue: item.rating, bestRating: 10 },
    author: { '@type': 'Organization', name: NAME },
    url: SITE + categoryPath
  }
}

export function articleJsonLd(a) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.h1,
    description: a.description,
    datePublished: a.date,
    author: { '@type': 'Organization', name: NAME },
    publisher: { '@type': 'Organization', name: NAME },
    mainEntityOfPage: SITE + '/blog/' + a.slug
  }
}
