import Audience from "../components/Audience";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import PracticeModes from "../components/PracticeModes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Seo from "../components/Seo";
import { SITE_URL } from "../config";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ορθόλεξο",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "Εκμάθηση ελληνικής ορθογραφίας για μαθητές Β΄–Στ΄ Δημοτικού με 12 τρόπους εξάσκησης και έξυπνη επανάληψη.",
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
      logo: `${SITE_URL}/logo.png`,
    },
    inLanguage: "el",
  };

  return (
    <>
      <Seo
        title="Ορθόλεξο — Μάθε να γράφεις σωστά!"
        description="Ορθόλεξο — εκμάθηση ελληνικής ορθογραφίας για μαθητές Β΄–Στ΄ Δημοτικού. 12 τρόποι εξάσκησης, έξυπνη επανάληψη, 5 ημέρες δωρεάν."
        path="/"
        jsonLd={jsonLd}
      />
      <Header />
      <main>
        <Hero />
        <Audience />
        <Features />
        <PracticeModes />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
