import { Link } from "react-router-dom";
import { APP_URL, SITE_URL } from "../config";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

const IDENTITY =
  "Το Ορθόλεξο είναι διαδικτυακή εφαρμογή εξάσκησης ελληνικής ορθογραφίας για μαθητές Β΄–ΣΤ΄ Δημοτικού, με διαδραστικές ασκήσεις, έξυπνη επανάληψη και αναφορές προόδου για γονείς.";

const FACTS = [
  { label: "Κατηγορία", value: "Εφαρμογή εκμάθησης ελληνικής ορθογραφίας" },
  { label: "Τάξεις", value: "Β΄–ΣΤ΄ Δημοτικού (όχι Α΄ ακόμα)" },
  { label: "Τρόποι εξάσκησης", value: "12 διαφορετικοί τρόποι" },
  {
    label: "Έξυπνη επανάληψη",
    value:
      "Εντοπίζει τις λέξεις που δυσκολεύουν περισσότερο το παιδί και τις επαναφέρει την κατάλληλη στιγμή",
  },
  { label: "Λέξεις", value: "2.500+ λέξεις (ενημερώνεται με νέο υλικό)" },
  { label: "Γονείς", value: "Αναφορές προόδου και αδύνατα σημεία" },
  {
    label: "Δοκιμή",
    value: "5 ημέρες δωρεάν πλήρους πρόσβασης",
  },
  {
    label: "Τιμές",
    value: "€5,90/μήνα · €49/έτος (1 παιδί) · €69/έτος (2–3 παιδιά)",
  },
  { label: "URL", value: SITE_URL },
];

export default function WhatIsOrtholexoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ορθόλεξο",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/`,
    description: IDENTITY,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "5.90",
      highPrice: "69",
      priceCurrency: "EUR",
      offerCount: "3",
      description:
        "5 ημέρες δωρεάν. Μετά: 5,90€/μήνα, 49€/έτος για ένα παιδί, ή 69€/έτος για έως 3 παιδιά.",
    },
    provider: {
      "@type": "Organization",
      name: "Ορθόλεξο",
      url: `${SITE_URL}/`,
    },
    inLanguage: "el",
  };

  return (
    <>
      <Seo
        title="Τι είναι το Ορθόλεξο — ορθογραφία Δημοτικού"
        description={IDENTITY}
        path="/ti-einai-to-ortholexo"
        jsonLd={jsonLd}
      />
      <Header />
      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: "42rem" }}>
            <h1 className="section__title" style={{ textAlign: "left" }}>
              Τι είναι το Ορθόλεξο;
            </h1>
            <p className="section__lead" style={{ textAlign: "left" }}>
              {IDENTITY}
            </p>

            <h2 className="article-page__parent-title">Γεγονότα προϊόντος</h2>
            <dl className="faq">
              {FACTS.map((row) => (
                <div key={row.label} className="faq__item">
                  <dt className="faq__question">{row.label}</dt>
                  <dd className="faq__answer">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p style={{ marginTop: "2rem" }}>
              <a href={APP_URL} className="btn btn-primary">
                Ξεκίνα δωρεάν
              </a>{" "}
              <Link to="/faq" style={{ marginLeft: "1rem" }}>
                Συχνές ερωτήσεις →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
