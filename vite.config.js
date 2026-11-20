import { Buffer } from 'node:buffer'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { personal } from './src/data/personal.js'
import { projects } from './src/data/projects.js'

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function replaceMetaContent(html, selector, content) {
  const pattern = new RegExp(`<meta\\s+${selector}\\s+content="[^"]*"\\s*\\/?>`)
  if (!pattern.test(html)) throw new Error(`Missing metadata tag: ${selector}`)
  return html.replace(pattern, (tag) => tag.replace(/content="[^"]*"/, `content="${escapeHtml(content)}"`))
}

function portfolioMetadata() {
  const title = [
    personal.name,
    personal.roles.map((role) => role.replace(/^(?:a|an)\s+/i, '')).filter(Boolean).slice(0, 2).join(' & '),
  ].filter(Boolean).join(' | ')
  const imageAlt = `${personal.name} — ${personal.seoDescription}`
  const siteUrl = personal.website.replace(/\/+$/, '')

  return {
    name: 'portfolio-metadata',
    transformIndexHtml(html) {
      return html
        .replace(/__PORTFOLIO_TITLE__/g, escapeHtml(title))
        .replace(/__PORTFOLIO_DESCRIPTION__/g, escapeHtml(personal.seoDescription))
        .replace(/__PORTFOLIO_IMAGE_ALT__/g, escapeHtml(imageAlt))
        .replace(/__PORTFOLIO_URL__/g, escapeHtml(`${siteUrl}/`))
        .replace(/__PORTFOLIO_SOCIAL_IMAGE__/g, escapeHtml(`${siteUrl}/social-card.png`))
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const indexAsset = Object.values(bundle).find((asset) => asset.type === 'asset' && asset.fileName === 'index.html')
        if (!indexAsset) {
          throw new Error('Could not generate project metadata without the built index.html')
        }
        const indexHtml = Buffer.from(indexAsset.source).toString('utf8')
        const notFoundTitle = `Page not found | ${personal.name}`
        const notFoundDescription = 'The requested page could not be found.'
        let notFoundHtml = indexHtml
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(notFoundTitle)}</title>`)
          .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, '')
          .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, '')

        notFoundHtml = replaceMetaContent(notFoundHtml, 'name="description"', notFoundDescription)
        notFoundHtml = replaceMetaContent(notFoundHtml, 'property="og:title"', notFoundTitle)
        notFoundHtml = replaceMetaContent(notFoundHtml, 'property="og:description"', notFoundDescription)
        notFoundHtml = replaceMetaContent(notFoundHtml, 'name="twitter:title"', notFoundTitle)
        notFoundHtml = replaceMetaContent(notFoundHtml, 'name="twitter:description"', notFoundDescription)
        notFoundHtml = notFoundHtml.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>')
        this.emitFile({ type: 'asset', fileName: '404.html', source: notFoundHtml })

        for (const project of projects) {
          const title = `${project.title} | ${personal.name}`
          const url = `${siteUrl}/projects/${project.slug}`
          let html = indexHtml
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
            .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`)

          html = replaceMetaContent(html, 'name="description"', project.description)
          html = replaceMetaContent(html, 'property="og:title"', title)
          html = replaceMetaContent(html, 'property="og:description"', project.description)
          html = replaceMetaContent(html, 'property="og:url"', url)
          html = replaceMetaContent(html, 'name="twitter:title"', title)
          html = replaceMetaContent(html, 'name="twitter:description"', project.description)

          this.emitFile({
            type: 'asset',
            fileName: `projects/${project.slug}/index.html`,
            source: html,
          })
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [portfolioMetadata(), react(), tailwindcss()],
})
