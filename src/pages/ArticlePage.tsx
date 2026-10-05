import { Link, Navigate, useParams } from "react-router-dom";
import { APP_URL, SITE_URL } from "../config";
import { getArticle } from "../generated/articles";
import Footer from "../components/Footer";
import Header from "../components/Header";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    url,
    image: `${SITE_URL}/og-image.png`,
    inLanguage: "el",
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
        <article className="section article-page">
          <div className="container article-page__inner">
            <p className="article-page__crumb">
              <Link to="/articles">Άρθρα</Link>
              <span aria-hidden="true"> / </span>
              <span>{article.title}</span>
            </p>
            <header className="article-page__header">
              <h1 className="article-page__title">{article.title}</h1>
              <p className="article-page__lead">{article.description}</p>
            </header>
            <div
              className="article-page__body"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
            <p className="article-page__cta">
              <a href={APP_URL} className="btn btn-primary">
                Ξεκίνα δωρεάν
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
