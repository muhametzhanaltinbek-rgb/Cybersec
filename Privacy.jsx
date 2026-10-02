import { useParams, Navigate, Link } from 'react-router-dom'
import Seo, { reviewJsonLd } from '../components/Seo'
import ProductCard from '../components/ProductCard'
import EmailForm from '../components/EmailForm'
import productsData from '../data/products.json'
import comparisons from '../data/comparisons.json'

export default function BestList() {
  const { category } = useParams()
  const data = productsData[category]
  if (!data) return <Navigate to="/" replace />
  const path = '/best/' + category
  const jsonLd = data.items.map(i => reviewJsonLd(i, path))
  const comps = Object.entries(comparisons).filter(([, c]) =>
    data.items.some(i => i.id === c.a) && data.items.some(i => i.id === c.b))
  return (
    <>
      <Seo title={data.title + ' — SecureHub'} description={data.description} path={path} jsonLd={jsonLd} />
      <article className="container-x py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Рейтинг</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">{data.title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{data.description}</p>
        <p className="mt-4 rounded-lg border border-line bg-panel px-4 py-3 text-xs text-muted">
          Честность: ссылки ниже — партнёрские, мы получаем комиссию с продаж. Это не влияет на оценки: методология тестов описана на странице <Link className="text-accent underline" to="/about">«О нас»</Link>.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {data.items.map((p, i) => <ProductCard key={p.id} item={p} index={i} placement={'best_' + category} />)}
        </div>
        {comps.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white">Прямые сравнения</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {comps.map(([slug, c]) => (
                <Link key={slug} to={'/compare/' + slug} className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-white hover:border-accent">{c.title.split(':')[0]}</Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-14"><EmailForm /></div>
      </article>
    </>
  )
}
