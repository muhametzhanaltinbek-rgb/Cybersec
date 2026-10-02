import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import articles from '../data/articles.json'

export default function Blog() {
  return (
    <>
      <Seo title="Блог о кибербезопасности — SecureHub" description="Гайды по паролям, VPN, фишингу и безопасности в сети. Практические инструкции без маркетинга." path="/blog" />
      <section className="container-x py-12">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Блог</h1>
        <p className="mt-3 text-muted">Практические гайды по цифровой безопасности.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <motion.div key={a.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={'/blog/' + a.slug} className="block h-full rounded-2xl border border-line bg-panel p-6 transition hover:border-accent">
                <p className="text-xs text-muted">{new Date(a.date).toLocaleDateString('ru-RU')}</p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-white">{a.h1}</h2>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">Читать →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
