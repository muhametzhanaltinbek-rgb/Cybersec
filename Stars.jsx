import { Link } from 'react-router-dom'
import EmailForm from './EmailForm'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="container-x grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">Secure<span className="text-accent">Hub</span></p>
          <p className="mt-3 text-sm text-muted">Независимые обзоры средств кибербезопасности. Мы можем получать комиссию по партнёрским ссылкам — это не влияет на оценки.</p>
          <Link to="/disclosure" className="mt-3 inline-block text-sm text-accent underline underline-offset-4">Раскрытие партнёрских ссылок</Link>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Навигация</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link className="hover:text-white" to="/best/vpn">Лучшие VPN</Link></li>
            <li><Link className="hover:text-white" to="/best/password-managers">Менеджеры паролей</Link></li>
            <li><Link className="hover:text-white" to="/best/antivirus">Антивирусы</Link></li>
            <li><Link className="hover:text-white" to="/blog">Блог</Link></li>
            <li><Link className="hover:text-white" to="/about">О нас</Link></li>
            <li><Link className="hover:text-white" to="/privacy">Конфиденциальность</Link></li>
          </ul>
        </div>
        <EmailForm compact />
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">© 2026 SecureHub. Все права защищены.</div>
    </footer>
  )
}
