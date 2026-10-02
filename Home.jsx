import { useParams, Navigate } from 'react-router-dom'
import Seo from '../components/Seo'
import AffiliateButton from '../components/AffiliateButton'
import Stars from '../components/Stars'
import comparisons from '../data/comparisons.json'
import productsData from '../data/products.json'

const ALL = Object.values(productsData).flatMap(c => c.items)

function findProduct(id) { return ALL.find(p => p.id === id) }

export default function Compare() {
  const { slug } = useParams()
  const cmp = comparisons[slug]
  if (!cmp) return <Navigate to="/" replace />
  const A = findProduct(cmp.a), B = findProduct(cmp.b)
  const path = '/compare/' + slug
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [{ '@type': 'Question', name: 'Что лучше: ' + A.name + ' или ' + B.name + '?',
      acceptedAnswer: { '@type': 'Answer', text: cmp.verdict } }]
  }
  return (
    <>
      <Seo title={cmp.title + ' — SecureHub'} description={cmp.description} path={path} jsonLd={jsonLd} />
      <article className="container-x py-12">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{cmp.title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{cmp.description}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[A, B].map(p => (
            <div key={p.id} className="rounded-2xl border border-line bg-panel p-6 text-center">
              <h2 className="text-2xl font-bold text-white">{p.name}</h2>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Stars value={p.rating} />
                <span className="text-sm font-bold text-accent">{p.rating.toFixed(1)}/10</span>
              </div>
              <p className="mt-1 text-sm text-muted">{p.price}</p>
              <AffiliateButton id={p.id} placement={'compare_' + slug} className="mt-5 w-full">{p.cta}</AffiliateButton>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">Сравнительная таблица</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="bg-panel text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3">Параметр</th>
                <th className="px-5 py-3 text-accent">{A.name}</th>
                <th className="px-5 py-3 text-accent">{B.name}</th>
              </tr>
            </thead>
            <tbody>
              {cmp.rows.map(r => (
                <tr key={r.param} className="border-t border-line">
                  <td className="px-5 py-3 font-semibold text-white">{r.param}</td>
                  <td className="px-5 py-3 text-muted">{r.a}</td>
                  <td className="px-5 py-3 text-muted">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[{ p: A, pros: cmp.prosA, cons: cmp.consA }, { p: B, pros: cmp.prosB, cons: cmp.consB }].map(({ p, pros, cons }) => (
            <div key={p.id} className="rounded-2xl border border-line bg-panel p-6">
              <h3 className="text-xl font-bold text-white">{p.name}: плюсы и минусы</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {pros.map(x => <li key={x} className="flex gap-2 text-gray-300"><span className="text-accent">✓</span>{x}</li>)}
                {cons.map(x => <li key={x} className="flex gap-2 text-muted"><span className="text-red-400">✗</span>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-accent/40 bg-accent/5 p-6">
          <h2 className="text-xl font-bold text-white">Вердикт</h2>
          <p className="mt-2 text-gray-300">{cmp.verdict}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <AffiliateButton id={A.id} placement={'compare_verdict_' + slug}>{'Попробовать ' + A.name}</AffiliateButton>
            <AffiliateButton id={B.id} placement={'compare_verdict_' + slug}>{'Попробовать ' + B.name}</AffiliateButton>
          </div>
        </div>
      </article>
    </>
  )
}
