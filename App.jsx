import { affiliateLink, trackClick } from './affiliates'

export default function AffiliateButton({ id, children, className = '', placement = 'default' }) {
  return (
    <a
      href={affiliateLink(id)}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={() => trackClick(id, placement)}
      className={'inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-base text-black transition hover:opacity-90 ' + className}
    >
      {children}
      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </a>
  )
}
