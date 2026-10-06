import { Link, Navigate, useParams } from "react-router-dom";
import { APP_URL, SITE_URL } from "../config";
import { getArticle } from "../generated/articles";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ResourceBundle from "../components/ResourceBundle";
import Seo from "../components/Seo";

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const path = `/articles/${article.slug}`;
  const title = `${article.title} — Ορθόλεξο`;
  const url = `${SITE_URL}${path}`;
  const ctaUrl = article.bundle?.premium.url ?? APP_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.bundle ? "LearningResource" : "BlogPosting",
    name: article.title,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    url,
    image: `${SITE_URL}/og-image.png`,
    inLanguage: "el",
    learningResourceType: article.bundle ? "practice problem" : undefined,
    educationalLevel: article.bundle
      ? `Δημοτικό ${article.bundle.grade}`
      : undefined,
    author: {
      "@type": "Organization",
      name: "Ορθόλεξο",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "Ορθόλεξο",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <Seo
        title={title}
        description={article.description}
        path={path}
        type="article"
        jsonLd={jsonLd}
      />
      <Header />
      <main>
        <article className={`section article-page ${article.bundle ? "article-page--bundle" : ""}`}>
          <div className="container article-page__inner">
            <p className="article-page__crumb">
              <Link to="/articles">Άρθρα</Link>
              <span aria-hidden="true"> / </span>
              <span>{article.title}</span>
            </p>
            <header className="article-page__header">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <h1 className="article-page__title">{article.title}</h1>
              <p className="article-page__lead">{article.description}</p>
            </header>

            {article.bundle && (
              <ResourceBundle bundle={article.bundle} articleTitle={article.title} />
            )}

            <div className="article-page__parent">
              <h2 className="article-page__parent-title">Οδηγός για γονείς</h2>
              <div
                className="article-page__body"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />
            </div>

            <p className="article-page__cta">
              <a href={ctaUrl} className="btn btn-primary">
                {article.bundle?.premium.cta ?? "Ξεκίνα δωρεάν"}
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
