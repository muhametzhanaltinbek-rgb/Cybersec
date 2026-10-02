// Аналитика без персональных данных. Провайдер: Plausible (если задан VITE_PLAUSIBLE_DOMAIN).
const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
const dnt = typeof navigator !== 'undefined' && navigator.doNotTrack === '1'
let ready = false

export function initAnalytics() {
  if (ready || !domain || dnt || typeof document === 'undefined') return
  const s = document.createElement('script')
  s.defer = true; s.dataset.domain = domain; s.src = 'https://plausible.io/js/script.outbound-links.js'
  document.head.appendChild(s)
  window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
  ready = true
}

export function track(event, props) {
  if (!ready || typeof window.plausible !== 'function') return
  window.plausible(event, props ? { props } : undefined)
}
