import { useParams, Navigate, Link } from 'react-router-dom'
import Seo, { faqJsonLd, articleJsonLd } from '../components/Seo'
import AffiliateButton from '../components/AffiliateButton'
import EmailForm from '../components/EmailForm'
import articles from '../data/articles.json'

export default function BlogPost() {
  const { slug } = useParams()
  const a = articles.find(x => x.slug === slug)
  if (!a) return <Navigate to="/blog" replace />
  const jsonLd = [articleJsonLd(a), faqJsonLd(a.faq)]
  return (
    <>
      <Seo title={a.title + ' — SecureHub'} description={a.description} path={'/blog/' + a.slug} jsonLd={jsonLd} />
      <article className="container-x max-w-3xl py-12">
        <nav className="text-xs text-muted"><Link to="/blog" className="hover:text-white">Блог</Link> / {a.h1}</nav>
        <p className="mt-6 text-xs text-muted">{new Date(a.date).toLocaleDateString('ru-RU')}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{a.h1}</h1>
        <p className="mt-4 text-lg text-muted">{a.intro}</p>

        <details className="mt-8 rounded-2xl border border-line bg-panel p-5" open>
          <summary className="cursor-pointer font-semibold text-white">Оглавление</summary>
          <ul className="mt-3 space-y-2 text-sm">
            {a.toc.map(t => <li key={t.id}><a href={'#' + t.id} className="text-accent underline underline-offset-4">{t.title}</a></li>)}
          </ul>
        </details>

        <div className="prose-x mt-8">
          {a.sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2>{s.h2}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.body }} />
            </section>
          ))}
        </div>

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-white">FAQ</h2>
          <div className="mt-4 space-y-3">
            {a.faq.map(f => (
              <details key={f.q} className="rounded-xl border border-line bg-panel p-5">
                <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl border border-accent/40 bg-accent/5 p-6">
          <h2 className="text-xl font-bold text-white">Рекомендуем</h2>
          <p className="mt-2 text-sm text-muted">{a.cta.text}. Ссылка партнёрская — вы ничего не доплачиваете, а мы получаем небольшую комиссию.</p>
          <AffiliateButton id={a.cta.product} placement={'article_' + a.slug} className="mt-5">{a.cta.text}</AffiliateButton>
        </div>

        <div className="mt-12"><EmailForm /></div>
      </article>
    </>
  )
}
