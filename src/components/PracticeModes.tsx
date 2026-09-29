import { type CSSProperties } from "react";
import { APP_URL } from "../config";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const MODES = [
  {
    icon: "📝",
    title: "Πρόταση",
    text: "Συμπλήρωσε το κενό στην πρόταση.",
  },
  {
    icon: "🎯",
    title: "Διάλεξε",
    text: "Διάλεξε τη σωστή λέξη από τις επιλογές.",
  },
  {
    icon: "🎧",
    title: "Υπαγόρευση",
    text: "Άκου και γράψε τη λέξη που ακούς.",
  },
  {
    icon: "✏️",
    title: "Διόρθωση",
    text: "Βρες και διόρθωσε το ορθογραφικό λάθος.",
  },
  {
    icon: "´",
    title: "Τονισμός",
    text: "Βάλε τον σωστό τόνο στη λέξη.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Οικογένεια",
    text: "Μάθε λέξεις της ίδιας λεξικής οικογένειας.",
  },
  {
    icon: "🧩",
    title: "Μορφήματα",
    text: "Χώρισε ή συνέθεσε μορφήματα.",
  },
  {
    icon: "🔀",
    title: "Ανακάτεμα",
    text: "Βάλε τα γράμματα στη σωστή σειρά.",
  },
  {
    icon: "🔗",
    title: "Ταίριασμα",
    text: "Σύνδεσε λέξεις με τις έννοιες τους.",
  },
  {
    icon: "➕",
    title: "Καταλήξεις",
    text: "Μάθε τις σωστές καταλήξεις των λέξεων.",
  },
  {
    icon: "🏗️",
    title: "Σύνθεση",
    text: "Φτιάξε λέξεις από μικρότερα μέρη.",
  },
  {
    icon: "📂",
    title: "Ομάδες",
    text: "Ταξινόμησε λέξεις σε ομάδες.",
  },
];

export default function PracticeModes() {
  const { ref, isVisible } = useRevealOnScroll<HTMLUListElement>();

  return (
    <section className="section section--alt" id="practice-modes">
      <div className="container">
        <h2 className="section__title">
          <span className="practice-modes__badge" aria-hidden="true">12</span>
          τρόποι εξάσκησης
        </h2>
        <p className="section__lead">
          Κάθε τρόπος εξάσκησης στοχεύει σε διαφορετική δεξιότητα — από
          συμπλήρωση πρότασης μέχρι σύνθεση λέξεων.
        </p>
        <ul
          ref={ref}
          className={`icon-card-grid icon-card-grid--modes${isVisible ? " is-visible" : ""}`}
        >
          {MODES.map((mode, index) => (
            <li
              key={mode.title}
              className="icon-card"
              style={{ "--delay": `${index * 55}ms` } as CSSProperties}
            >
              <span className="icon-card__icon" aria-hidden="true">
                {mode.icon}
              </span>
              <h3 className="icon-card__title">{mode.title}</h3>
              <p className="icon-card__text">{mode.text}</p>
            </li>
          ))}
        </ul>
        <p className="section__cta">
          <a href={APP_URL} className="btn btn-primary">
            Δοκίμασε όλους τους τρόπους δωρεάν
          </a>
        </p>
      </div>
    </section>
  );
}
