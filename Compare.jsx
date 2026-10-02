import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Disclosure from './pages/Disclosure'
import Privacy from './pages/Privacy'
import Tools from './pages/Tools'
import PasswordStrength from './pages/tools/PasswordStrength'
import PasswordGenerator from './pages/tools/PasswordGenerator'
import HeaderCheck from './pages/tools/HeaderCheck'
import Compare from './pages/Compare'
import BestList from './pages/BestList'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="best/:category" element={<BestList />} />
          <Route path="compare/:slug" element={<Compare />} />
          <Route path="tools" element={<Tools />} />
          <Route path="tools/password-strength" element={<PasswordStrength />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />
          <Route path="tools/header-check" element={<HeaderCheck />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="disclosure" element={<Disclosure />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
