import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";
import {
  faqJsonLd,
  groupFaqByCategory,
  SITE_FAQ,
} from "../constants/faq";

export default function FaqPage() {
  const grouped = groupFaqByCategory(SITE_FAQ);

  return (
    <>
      <Seo
        title="Συχνές ερωτήσεις — Ορθόλεξο"
        description="Απαντήσεις για το Ορθόλεξο: τάξεις Β΄–Στ΄, έξυπνη επανάληψη, 12 τρόποι εξάσκησης, τιμές, δοκιμή και πρόοδος γονέων."
        path="/faq"
        jsonLd={faqJsonLd(SITE_FAQ)}
      />
      <Header />
      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: "42rem" }}>
            <h1 className="section__title" style={{ textAlign: "left" }}>
              Συχνές ερωτήσεις
            </h1>
            <p className="section__lead" style={{ textAlign: "left" }}>
              Αυτοτελείς απαντήσεις για γονείς. Για πλήρη περιγραφή του
              προϊόντος δες{" "}
              <Link to="/ti-einai-to-ortholexo">Τι είναι το Ορθόλεξο</Link>.
            </p>

            {grouped.map(([category, items]) => (
              <section key={category} style={{ marginTop: "2.5rem" }}>
                <h2 className="article-page__parent-title">{category}</h2>
                <dl className="faq">
                  {items.map((item) => (
                    <div key={item.q} className="faq__item">
                      <dt className="faq__question">{item.q}</dt>
                      <dd className="faq__answer">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
