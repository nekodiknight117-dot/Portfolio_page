import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // Set VITE_BASE_PATH (e.g. "/Portfolio_page/") when deploying to a sub-path
    // such as GitHub Pages project sites. Leave unset for Vercel / Netlify.
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
  }
})
