import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Experience } from './pages/Experience'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'
import { Projects } from './pages/Projects'
import { Resume } from './pages/Resume'
import { Skills } from './pages/Skills'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
