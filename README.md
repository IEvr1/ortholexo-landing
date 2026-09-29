# Ορθόλεξο — Landing Page

Marketing site for **Ορθόλεξο** (`ortholexo.gr`). CTAs link to the PWA at `app.ortholexo.gr`.

## URL architecture

| URL | Role |
|-----|------|
| `ortholexo.gr` | This landing page |
| `app.ortholexo.gr` | PWA (login, practice, legal pages) |
| `nexaipla.com/ortholexo` | NexAIpla hub card → `ortholexo.gr` |

```
nexaipla.com/ortholexo  →  ortholexo.gr  →  «Ξεκίνα»  →  app.ortholexo.gr
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

Copy `.env.example` to `.env.local` if you need custom URLs during dev.

## Build

```bash
npm run build
npm run preview
```

Output: `dist/`

## Vercel — Project A (landing)

1. Import this repo as a **new Vercel project**
2. Framework preset: **Vite**
3. Root Directory: `/` (repo root)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Environment variables (Production):
   - `VITE_SITE_URL=https://ortholexo.gr`
   - `VITE_APP_URL=https://app.ortholexo.gr`
7. Domains: `ortholexo.gr`, `www.ortholexo.gr`

## Vercel — Project B (app, existing Orthographia)

Root: `scripts/orthografia-app/web` in the Orthographia repo.

### Domain

- Add `app.ortholexo.gr` to the app project

### Environment variables

Update to the new canonical URL:

```
VITE_APP_URL=https://app.ortholexo.gr
APP_BASE_URL=https://app.ortholexo.gr
```

### Clerk

- Allowed origins: `https://app.ortholexo.gr`
- Sign-in / sign-up redirect URLs: `https://app.ortholexo.gr/*`

### Stripe

- Success URL: `https://app.ortholexo.gr/...`
- Cancel URL: `https://app.ortholexo.gr/...`
- Webhook endpoint: `https://app.ortholexo.gr/api/stripe/webhook`

### Redirects (301)

- Old `*.vercel.app` deployment URL → `https://app.ortholexo.gr`
- `orthografia.app` → `https://app.ortholexo.gr` (if previously used)

## DNS (Papaki)

| Record | Target |
|--------|--------|
| `@` (ortholexo.gr) | Vercel landing project |
| `www` | Vercel landing project |
| `app` CNAME | Vercel app project |
| `ortholexo.com` | 301 redirect → `https://ortholexo.gr` |

Configure domain redirects in Vercel or Papaki as preferred.

## Legal pages

Privacy, Terms, and Contact live on the **app** (single source of truth):

- `https://app.ortholexo.gr/privacy`
- `https://app.ortholexo.gr/terms`
- `https://app.ortholexo.gr/contact`

The landing footer links to these URLs via `VITE_APP_URL`.

## Follow-up (outside this repo)

1. **NexAIpla hub** — add card at `nexaipla.com/ortholexo` linking to `https://ortholexo.gr`
2. **App UI rename** — optional: rename «Ορθογραφία» → «Ορθόλεξο» in the PWA
3. **Email domain** — update `privacy@…` if moving off `orthografia.app`
