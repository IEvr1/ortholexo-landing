import { Link } from "react-router-dom";
import { SITE_URL } from "../config";
import { listArticles } from "../generated/articles";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

export default function ArticlesPage() {
  const articles = listArticles();
  const title = "Άρθρα — Ορθόλεξο";
  const description =
    "Άρθρα για ελληνική ορθογραφία, μελέτη στο σπίτι και το Ορθόλεξο για μαθητές Δημοτικού.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${SITE_URL}/articles`,
    isPartOf: {
      "@type": "WebSite",
      name: "Ορθόλεξο",
      url: `${SITE_URL}/`,
    },
    inLanguage: "el",
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/articles"
        jsonLd={jsonLd}
      />
      <Header />
      <main>
        <section className="section articles-page">
          <div className="container">
            <h1 className="section__title">Άρθρα</h1>
            <p className="section__lead">
              Συμβουλές για ορθογραφία και το Ορθόλεξο — για γονείς και
              εκπαιδευτικούς.
            </p>
            {articles.length === 0 ? (
              <p className="articles-empty">Σύντομα νέα άρθρα.</p>
            ) : (
              <ul className="articles-list">
                {articles.map((article) => (
                  <li key={article.slug} className="articles-list__item">
                    <time
                      className="articles-list__date"
                      dateTime={article.date}
                    >
                      {formatDate(article.date)}
                    </time>
                    <h2 className="articles-list__title">
                      <Link to={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="articles-list__excerpt">
                      {article.description}
                    </p>
                    <Link
                      className="articles-list__more"
                      to={`/articles/${article.slug}`}
                    >
                      Διαβάστε περισσότερα
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
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
