import Audience from "./components/Audience";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import PracticeModes from "./components/PracticeModes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";

export default function App() {
  return (
    <>
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
