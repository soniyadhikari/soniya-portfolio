# Soniya Adhikari Portfolio

A responsive React and Vite portfolio for Soniya Adhikari, using local structured data and a static deployment architecture.
The hero uses a lightweight CSS 3D orbital illustration, so it requires no model downloads, WebGL framework, or server-side code and works on Vercel as a static site.

## Development

```powershell
npm install
npm run dev
```

## Production

```powershell
npm run build
npm run preview
```

## Editable content

- `src/data/personal.js`: name, links, email, and introduction
- `src/data/projects.js`: project cards and detail-page content
- `src/data/skills.js`: skill categories and proficiency labels
- `src/data/education.js`: education and leadership details
- `src/data/research.js`: interests, experiments, reading, notes, and publications
- `src/data/experience.js`: future experience entries (not currently rendered)
- `src/data/journey.js`: timeline milestones

Each data file includes a short note describing what to edit. Do not add achievements or publications that are not verified. The Research section remains intentionally hidden for now; its future content belongs in `src/data/research.js`. No Experience section is shown because no experience details have been provided.

## Keeping the portfolio up to date

Portfolio content is stored in the `src/data/` files, separately from the UI. The Projects section shows only the curated entries in `src/data/projects.js`; it does not fetch GitHub repositories. Add a project to that array to create a project card and generated detail page. Skills and journey items are rendered from their matching data files.

Add journey milestones to `src/data/journey.js`, update education, leadership, and leadership achievements in `src/data/education.js`, and revise skills or personal content in their matching data files. Research remains hidden, and there is no experience section yet. Run `npm run lint` and `npm run build` after edits.

## Assets

The bundled `public/soniya-cv.pdf` is a valid one-page PDF. Review it before publishing and replace it with an up-to-date CV if needed. No profile photo is currently used.
The 1200×630 social-sharing preview is `public/social-card.png`. Update it if you change the public name or design.
The default title, description, and canonical domain are read from `src/data/personal.js` and inserted into `index.html` at build time. Route-specific metadata is managed in `src/App.jsx`. If the domain changes, update `public/robots.txt` and `public/sitemap.xml` too.

## Contact form

The Formspree endpoint is configured in `.env.example`. Copy it to `.env.local`
for local development, then restart Vite:

```powershell
Copy-Item .env.example .env.local
```

The form submits messages to Formspree, which forwards them to the recipient
configured in the Formspree dashboard. The endpoint is public frontend
configuration, not a password. For Vercel, add the same
`VITE_FORMSPREE_ENDPOINT` value in the project's Environment Variables and
redeploy. The email link remains available as a fallback.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Use Vite, `npm run build`, and `dist`. The `vercel.json` file routes project refreshes to generated pages and sets basic security headers. A generated `404.html` serves unknown paths as actual 404 responses.
4. Add `VITE_FORMSPREE_ENDPOINT` as a Vercel environment variable.
5. Add `soniyaadhikari.com.np` as a custom domain in Vercel.

DNS configuration must be performed separately in the domain registrar using the records shown in Vercel. Do not commit secrets to the repository.
