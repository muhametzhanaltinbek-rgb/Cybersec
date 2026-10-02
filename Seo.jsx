// Генерирует sitemap.xml и robots.txt для реального домена из VITE_SITE_URL.
import { readFileSync, writeFileSync } from 'node:fs'
const site = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')
if (!site) { console.warn('VITE_SITE_URL не задан: sitemap.xml и robots.txt не обновлены.'); process.exit(0) }
const routes = ['/', '/best/vpn', '/best/password-managers', '/best/antivirus',
  '/compare/nordvpn-vs-surfshark', '/compare/expressvpn-vs-nordvpn', '/tools', '/tools/password-strength',
  '/tools/password-generator', '/tools/header-check', '/blog', '/about', '/disclosure', '/privacy']
const articles = JSON.parse(readFileSync(new URL('../src/data/articles.json', import.meta.url), 'utf8'))
articles.forEach(a => routes.push('/blog/' + a.slug))
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map(r => `  <url><loc>${site}${r}</loc></url>`).join('\n') + '\n</urlset>\n'
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`)
console.log(`SEO-файлы созданы для ${site}: ${routes.length} адресов`)
