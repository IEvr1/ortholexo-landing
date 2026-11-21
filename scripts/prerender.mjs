import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const templatePath = join(distDir, "index.html");

const SITE_URL = (process.env.VITE_SITE_URL ?? "https://ortholexo.gr").replace(
  /\/$/,
  "",
);
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceMeta(html, { title, description, url, type, jsonLd }) {
  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );

  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
  );

  out = out.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${escapeHtml(type)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
  );

  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );

  out = out.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  );

  return out;
}

const HOME_FAQ = [
  [
    "Για ποιες τάξεις είναι το Ορθόλεξο;",
    "Για μαθητές Β΄, Γ΄, Δ΄, Ε΄ και Στ΄ Δημοτικού. Η Α΄ τάξη δεν υποστηρίζεται ακόμα.",
  ],
  [
    "Πώς λειτουργεί η δωρεάν δοκιμή;",
    "Με την εγγραφή γονέα αποκτάς 5 ημέρες πλήρους πρόσβασης. Μετά μπορείς να επιλέξεις συνδρομή ή να σταματήσεις.",
  ],
  [
    "Μπορώ να ακυρώσω τη συνδρομή;",
    "Ναι. Στο μηνιαίο πλάνο η ακύρωση γίνεται ανά πάσα στιγμή μέσα από τον λογαριασμό σου.",
  ],
  [
    "Λειτουργεί σε tablet και κινητό;",
    "Ναι. Το Ορθόλεξο είναι web εφαρμογή (PWA) — λειτουργεί σε browser και συγχρονίζει την πρόοδο σε όλες τις συσκευές.",
  ],
  [
    "Πώς προστατεύονται τα δεδομένα του παιδιού;",
    "Απαιτείται συναίνεση γονέα (GDPR). Δες την Πολιτική Απορρήτου στην εφαρμογή για λεπτομέρειες.",
  ],
];

function homeBody() {
  const faq = HOME_FAQ.map(
    ([q, a]) => `<h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p>`,
  ).join("");
  return `<main id="crawler-prerender" lang="el"><h1>Ορθόλεξο — μάθε να γράφεις σωστά</h1><p>Διαδραστική εξάσκηση ελληνικής ορθογραφίας για μαθητές Β΄–Στ΄ Δημοτικού, με 12 τρόπους παιχνιδιού, έξυπνη επανάληψη και αναφορές για γονείς. Οι πρώτες 5 ημέρες είναι δωρεάν.</p><ul><li><strong>Premium — 1 παιδί</strong> 49€ τον χρόνο.</li><li><strong>Premium — μηνιαία</strong> 5,90€ τον μήνα, με ακύρωση ανά πάσα στιγμή.</li><li><strong>Οικογενειακό</strong> 69€ τον χρόνο, για έως 3 παιδιά.</li></ul><h2>Συχνές ερωτήσεις</h2>${faq}</main>`;
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function injectBody(html, bodyInner) {
  return html.replace(
    /<div id="root">\s*(?:<main id="crawler-prerender">[\s\S]*?<\/main>\s*)?<\/div>/,
    `<div id="root">${bodyInner}</div>`,
  );
}

function wordListHtml(article) {
  const words = article.bundle?.words;
  if (!Array.isArray(words) || words.length === 0) return "";
  const items = words
    .map((entry) => `<li>${escapeHtml(entry.word)}</li>`)
    .join("");
  return `<h2>Οι ${words.length} λέξεις</h2><ul>${items}</ul>`;
}

function writeRoute(relativeDir, html) {
  const dir = join(distDir, relativeDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}

async function main() {
  if (!existsSync(templatePath)) {
    throw new Error("dist/index.html missing — run vite build first");
  }

  const articlesJson = JSON.parse(
    readFileSync(join(root, "src", "generated", "articles.json"), "utf8"),
  );
  const articles = [...articlesJson].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const template = readFileSync(templatePath, "utf8");

  let homeHtml = injectBody(template, homeBody());
  const faqScript = `<script type="application/ld+json" id="crawler-faq">${JSON.stringify(faqJsonLd())}</script>`;
  if (homeHtml.includes('id="crawler-faq"')) {
    homeHtml = homeHtml.replace(
      /<script type="application\/ld\+json" id="crawler-faq">[\s\S]*?<\/script>/,
      faqScript,
    );
  } else {
    homeHtml = homeHtml.replace("</head>", `    ${faqScript}\n  </head>`);
  }
  writeFileSync(templatePath, homeHtml, "utf8");

  const listTitle = "Άρθρα — Ορθόλεξο";
  const listDescription =
    "Άρθρα για ελληνική ορθογραφία, μελέτη στο σπίτι και το Ορθόλεξο για μαθητές Δημοτικού.";
  const listUrl = `${SITE_URL}/articles`;
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: listTitle,
    description: listDescription,
    url: listUrl,
    isPartOf: { "@type": "WebSite", name: "Ορθόλεξο", url: `${SITE_URL}/` },
    inLanguage: "el",
  };

  const listItems = articles
    .map(
      (a) =>
        `<li><a href="/articles/${a.slug}"><time datetime="${a.date}">${a.date}</time> — ${escapeHtml(a.title)}</a><p>${escapeHtml(a.description)}</p></li>`,
    )
    .join("");

  let listHtml = replaceMeta(template, {
    title: listTitle,
    description: listDescription,
    url: listUrl,
    type: "website",
    jsonLd: listJsonLd,
  });
  listHtml = injectBody(
    listHtml,
    `<main class="articles-prerender"><h1>Άρθρα</h1><ul>${listItems}</ul></main>`,
  );
  writeRoute("articles", listHtml);

  for (const article of articles) {
    const url = `${SITE_URL}/articles/${article.slug}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      url,
      image: OG_IMAGE,
      inLanguage: "el",
      author: {
        "@type": "Organization",
        name: article.author || "Ορθόλεξο",
        url: `${SITE_URL}/`,
      },
      publisher: {
        "@type": "Organization",
        name: "Ορθόλεξο",
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    };

    let page = replaceMeta(template, {
      title: `${article.title} — Ορθόλεξο`,
      description: article.description,
      url,
      type: "article",
      jsonLd,
    });
    page = injectBody(
      page,
      `<article class="article-prerender"><h1>${escapeHtml(article.title)}</h1><p class="article-prerender__meta">${escapeHtml(article.author || "Ορθόλεξο")} · Δημοσίευση <time datetime="${article.date}">${article.date}</time> · Τελευταία αναθεώρηση <time datetime="${article.updated ?? article.date}">${article.updated ?? article.date}</time></p>${article.html}${wordListHtml(article)}</article>`,
    );
    writeRoute(join("articles", article.slug), page);
  }

  console.log(`Prerendered /articles + ${articles.length} article page(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
