# Ortholexo crawler policy

## Public / indexable

Landing pages and `/articles/*` are public. App practice lives on `app.ortholexo.gr` (separate host).

## Training vs discovery

- Discovery crawlers: allow (inherited from `User-agent: *`).
- GPTBot (training): disallow via `public/robots.txt`.

Cross-product policy: AuthoringTool `docs/seo-crawler-policy.md`.
