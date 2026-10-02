import { useState } from 'react'
import { track } from '../services/analytics'

export default function EmailForm({ compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [honey, setHoney] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError('Введите корректный email'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: honey }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error === 'invalid_email' ? 'Введите корректный email'
          : data.error === 'not_configured' ? 'Подписка пока не подключена. Попробуйте позже.'
          : 'Не удалось оформить подписку. Попробуйте ещё раз позже.')
      } else { setStatus(data.status); track('Newsletter Signup') }
    } catch { setError('Нет связи с сервером. Проверьте интернет и повторите.') }
    setLoading(false)
  }

  if (status) return (
    <div role="status" className="rounded-xl border border-accent/40 bg-accent/5 p-5 text-sm text-gray-200">
      {status === 'exists' ? 'Этот адрес уже есть в рассылке.' : 'Почти готово. Мы отправили письмо: подтвердите подписку по ссылке в нём.'}
    </div>
  )

  return (
    <form onSubmit={submit} className={compact ? '' : 'rounded-2xl border border-line bg-panel p-6 sm:p-8'}>
      {!compact && (
        <>
          <h3 className="text-xl font-bold text-white">Рассылка о кибербезопасности</h3>
          <p className="mt-2 text-sm text-muted">Короткие разборы угроз и обновления наших обзоров. Отписаться можно в любом письме.</p>
        </>
      )}
      {compact && <p className="mb-3 text-sm font-semibold text-white">Подписаться на рассылку</p>}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email" required value={email} onChange={e => setEmail(e.target.value)}
          placeholder="ваш@email.com" aria-label="Email" autoComplete="email"
          className="w-full rounded-lg border border-line bg-base px-4 py-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <input type="text" name="website" value={honey} onChange={e => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={loading} className="shrink-0 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black hover:opacity-90">
          {loading ? 'Отправляю…' : 'Подписаться'}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-red-400">{error}</p>}
      <p className="mt-2 text-xs text-muted">Мы используем ваш email только для рассылки. Подробнее в <a className="underline" href="/privacy">политике конфиденциальности</a>.</p>
    </form>
  )
}
