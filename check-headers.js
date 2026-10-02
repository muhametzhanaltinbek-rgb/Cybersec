// Vercel serverless: подписка через Buttondown (двойное подтверждение). Ключ только в env.
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' })
  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {})
  if (body.website) return res.status(200).json({ status: 'ok' }) // honeypot для ботов
  const email = String(body.email || '').trim().toLowerCase()
  if (email.length > 254 || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'invalid_email' })
  const key = process.env.BUTTONDOWN_API_KEY
  if (!key) return res.status(503).json({ error: 'not_configured' })
  try {
    const r = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email, type: 'unactivated' }),
      signal: AbortSignal.timeout(8000),
    })
    if (r.ok) return res.status(200).json({ status: 'ok' })
    const text = await r.text()
    if (r.status === 409 || (r.status === 400 && /already|exists/i.test(text))) return res.status(200).json({ status: 'exists' })
    return res.status(502).json({ error: 'provider_error' })
  } catch { return res.status(502).json({ error: 'provider_error' }) }
}
function safeParse(s) { try { return JSON.parse(s) } catch { return {} } }
