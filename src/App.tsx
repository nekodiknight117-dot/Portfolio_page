import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'

/** Former per-page routes now live as sections of the home page; keep old links working. */
const sectionRedirects = ['projects', 'about', 'skills', 'experience', 'resume', 'contact']

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          {sectionRedirects.map((id) => (
            <Route key={id} path={id} element={<Navigate to={`/#${id}`} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
