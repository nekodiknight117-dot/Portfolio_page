# Portfolio

A personal portfolio built with **React 19 + TypeScript + Vite**, styled with **Tailwind CSS v4** in a dark "motorsport dashboard" theme: asphalt and carbon surfaces, racing-red accents, speedometer gauges for skills, odometer counters for stats, and a track-style timeline for experience.

## Pages

| Route | Page | What it shows |
| --- | --- | --- |
| `/` | Home | Intro, photo, specialties, animated stats, featured projects |
| `/projects` | Projects | All projects as cards with screenshots, tech badges, links, and a technology filter |
| `/projects/:slug` | Project Details | Problem & solution, features, technical decisions, technologies, challenges & lessons, repo and demo links |
| `/about` | About | Bio, education, career goals, interests |
| `/skills` | Skills | Languages, frameworks, databases, tools, platforms with gauges |
| `/experience` | Experience | Jobs, internships, freelance, volunteering on a filterable timeline |
| `/resume` | Resume | Online summary plus downloadable PDF |
| `/contact` | Contact | Email, LinkedIn, GitHub, and a contact form (EmailJS) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

## Editing your content

All site content is plain TypeScript data. No component changes are needed to personalise the site.

| File | What to edit |
| --- | --- |
| `src/data/profile.ts` | Name, role, tagline, location, email, intro, bio paragraphs, specialties, stats, social links, photo and resume paths |
| `src/data/projects.ts` | Projects. Each entry has a `slug` (becomes the URL), summary, image, technologies, `featured` flag, links, and the full `details` write-up |
| `src/data/skills.ts` | Skills with a `level` (0-100) and a category |
| `src/data/experience.ts` | Jobs / internships / freelance / volunteering. Use `"YYYY-MM"` dates and `end: null` for a current role |
| `src/data/education.ts` | Education, career goals, interests |

The shapes are defined in `src/types.ts`, so your editor will flag any missing fields.

### Images and files

- **Profile photo:** drop a file into `public/` (e.g. `public/me.jpg`) and set `photo: '/me.jpg'` in `profile.ts`. A square image works best.
- **Project screenshots:** add images to `public/projects/` and point each project's `image` at them. 16:9 images work best. The current `.svg` files are placeholders.
- **Resume PDF:** replace `public/resume.pdf` with your real resume (keep the filename, or update `resumePdf` in `profile.ts`). The current file is a one-page placeholder.
- **Favicon:** `public/favicon.svg`.

## Contact form (EmailJS)

The form sends messages through [EmailJS](https://www.emailjs.com) directly from the browser; no backend needed. Until it is configured, submitting the form falls back to opening the visitor's email client with the message pre-filled.

1. Create a free EmailJS account.
2. **Email Services** -> add a service (Gmail, Outlook, etc.) and copy its **Service ID**.
3. **Email Templates** -> create a template. Use these variables in the subject/body:
   `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{to_name}}`.
   Set the template's "To email" to your address and "Reply To" to `{{from_email}}`. Copy the **Template ID**.
4. **Account -> API Keys** -> copy your **Public Key**.
5. Copy `.env.example` to `.env` and fill in the three values:

   ```bash
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

6. Restart `npm run dev`. When deploying, add the same three variables in your host's environment settings.

`.env` is gitignored. The public key is safe to ship to the browser (that is how EmailJS works); restrict it to your domain in the EmailJS dashboard for extra safety.

## Deployment

The site is a static SPA. Any static host works; the repo already includes the fallback config each one needs so deep links like `/projects/lap-logger` load correctly.

### Vercel

Import the GitHub repo. Framework preset: **Vite**. Build command `npm run build`, output `dist`. `vercel.json` handles SPA rewrites. Add the `VITE_EMAILJS_*` environment variables in the project settings.

### Netlify

Import the repo. Build command `npm run build`, publish directory `dist`. `public/_redirects` handles SPA routing. Add the env variables under Site settings -> Environment variables.

### GitHub Pages

GitHub Pages serves project sites from a sub-path (`https://<user>.github.io/<repo>/`), so set the base path before building:

1. In `.env` (or as a CI variable) set `VITE_BASE_PATH=/Portfolio_page/` (use your repo name, with leading and trailing slashes).
2. `public/404.html` already contains the redirect shim for deep links. Its `pathSegmentsToKeep` is `1` for a project site; change it to `0` if you deploy to a user site (`<user>.github.io`) and leave `VITE_BASE_PATH` unset.
3. Build and publish `dist/` to the `gh-pages` branch, for example:

   ```bash
   npm run build
   npx gh-pages -d dist
   ```

   Or use a GitHub Actions workflow that runs `npm ci && npm run build` and deploys `dist/` with `actions/deploy-pages`.

## Project structure

```
src/
  main.tsx, App.tsx           # entry + routes
  index.css                   # Tailwind import, theme tokens, motif utilities
  types.ts                    # content types
  data/                       # all editable content
  lib/                        # small helpers (cn, publicUrl)
  components/
    layout/                   # Navbar, MobileMenu, Footer, Layout
    ui/                       # Button, Card, Gauge, Odometer, Timeline, TechBadge, SectionHeading, RacingStripe
    ProjectCard, ContactForm, SEO, SocialIcon, BrandIcons, PageTransition
  pages/                      # one file per route
public/
  profile-placeholder.svg, projects/*.svg, resume.pdf, favicon.svg
  404.html, _redirects        # SPA fallbacks for GitHub Pages / Netlify
vercel.json                   # SPA fallback for Vercel
```

## Customising the theme

Colours, fonts, and shadows are defined as Tailwind theme tokens at the top of `src/index.css` (`--color-racing-500`, `--color-amber-glow-500`, `--color-asphalt-*`, `--font-display`, etc.). Change them there and every component updates. The car motifs (`racing-stripe`, `checkered`, `carbon`, `grid-fade`) are custom utilities in the same file.
