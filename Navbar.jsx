import { motion } from 'framer-motion'
import Stars from './Stars'
import AffiliateButton from './AffiliateButton'

export default function ProductCard({ item, index, placement }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={'relative flex flex-col rounded-2xl border bg-panel p-6 ' + (item.best ? 'border-accent' : 'border-line')}
    >
      {item.best && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">ВЫБОР РЕДАКЦИИ</span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-muted">#{index + 1}</span>
          <h3 className="mt-1 text-xl font-bold text-white">{item.name}</h3>
        </div>
        <div className="text-right">
          <Stars value={item.rating} />
          <p className="mt-1 text-sm font-bold text-accent">{item.rating.toFixed(1)}/10</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">{item.price}</p>
      <ul className="mt-4 flex-1 space-y-2 text-sm">
        {item.pros.map(p => <li key={p} className="flex gap-2 text-gray-300"><span className="text-accent">✓</span>{p}</li>)}
        {item.cons.map(c => <li key={c} className="flex gap-2 text-muted"><span className="text-red-400">✗</span>{c}</li>)}
      </ul>
      <AffiliateButton id={item.id} placement={placement} className="mt-6 w-full">{item.cta}</AffiliateButton>
    </motion.article>
  )
}
