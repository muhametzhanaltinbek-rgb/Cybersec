# SecureHub — сайт-монетизатор в нише кибербезопасности

React + Vite + Tailwind + Framer Motion + React Router + react-helmet-async. Статичные JSON-данные, без бэкенда.

## Запуск

```bash
npm install
npm run dev      # разработка
npm run build    # продакшен в dist/
npm run preview  # локальный просмотр сборки
```

## Деплой (бесплатно)

```bash
npm i -g vercel && vercel --prod
```

Обновите домен в: `public/robots.txt`, `public/sitemap.xml`, `src/components/Seo.jsx` (константа SITE).

## Монетизация

1. Подайте заявки в партнёрские программы (список в конце README).
2. Вставьте свои ссылки **только в `src/data/affiliates.json`** — весь сайт подтянет их автоматически.
3. Все кнопки используют `<AffiliateButton>` → `rel="sponsored nofollow"` + трекинг кликов (GA4/Plausible).
4. Email-форма сохраняет лиды в localStorage. Для продакшена замените `submit` в `src/components/EmailForm.jsx` на вызов вашего сервиса рассылок (ConvertKit, Beehiiv, MailerLite — у всех бесплатные тарифы) и отдавайте PDF-чек-лист через welcome-письмо.
5. Инструмент «Проверка заголовков» использует публичный прокси allorigins.win. Для стабильности перенесите запрос в serverless-функцию (Vercel/Cloudflare Functions) — CORS у целевых сайтов блокирует прямой fetch.

## SEO

- Мета/OG/JSON-LD — через `Seo.jsx` (Review, FAQPage, Article, WebSite).
- `public/robots.txt`, `public/sitemap.xml` — обновите домен.
- Lighthouse 90+: manualChunks для vendor-бандла, lazy-страницы через React.lazy, шрифт с `display=swap`.

## Структура контента

- `src/data/products.json` — рейтинги (vpn / password-managers / antivirus). Добавьте категорию → появится страница `/best/<category>`.
- `src/data/comparisons.json` — страницы `/compare/:slug` (таблица, плюсы/минусы, вердикт).
- `src/data/articles.json` — статьи блога (оглавление, H2-секции HTML, FAQ, CTA).

## Production: что изменено и как запускать

- `api/check-headers.js` — серверная проверка заголовков (защита от SSRF: только публичные IP, http/https, таймаут 8 с, до 3 редиректов). Публичный CORS-прокси удалён.
- `api/subscribe.js` — подписка через Buttondown с двойным подтверждением. Без ключа возвращает честную ошибку, а не имитирует успех.
- `src/services/analytics.js` — Plausible без cookies и персональных данных, уважает Do Not Track. Без `VITE_PLAUSIBLE_DOMAIN` ничего не отправляется.
- `vercel.json` — CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- `scripts/generate-seo.mjs` — перед сборкой создаёт sitemap.xml и robots.txt для вашего домена.

Переменные окружения: см. `.env.example` (VITE_SITE_URL, VITE_CONTACT_EMAIL, VITE_PLAUSIBLE_DOMAIN, BUTTONDOWN_API_KEY).

Запуск: `npm install`, затем `npx vercel dev` (нужен, чтобы работали /api), сборка: `npm run build`.
Деплой: подключите репозиторий в Vercel, добавьте переменные окружения, задеплойте.
