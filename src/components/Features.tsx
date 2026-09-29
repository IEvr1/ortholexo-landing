const MODES = [
  "Πρόταση",
  "Διάλεξε",
  "Υπαγόρευση",
  "Διόρθωση",
  "Τονισμός",
  "Οικογένεια",
  "Μορφήματα",
  "Ανακάτεμα",
  "Ταίριασμα",
  "Καταλήξεις",
  "Σύνθεση",
  "Ομάδες",
];

const FEATURES = [
  {
    title: "12 τρόποι εξάσκησης",
    text: "Από πρόταση με κενό μέχρι σύνθεση λέξεων — κάθε τρόπος ενισχύει διαφορετική δεξιότητα.",
  },
  {
    title: "Εβδομαδιαίος κανόνας",
    text: "Κάθε εβδομάδα εστιάζεις σε έναν κανόνα ορθογραφίας με 5 λέξεις — σταδιακή και οργανωμένη μάθηση.",
  },
  {
    title: "Έξυπνη επανάληψη (FSRS)",
    text: "Ο αλγόριθμος FSRS θυμάται τις λέξεις που δυσκολεύεσαι και τις ξαναφέρνει την κατάλληλη στιγμή.",
  },
  {
    title: "Σειρές & badges",
    text: "Κράτα το κίνητρο ζωντανό με ημερήσιες σειρές, επιτεύγματα και ορατή πρόοδο.",
  },
  {
    title: "Αναφορά γονέα",
    text: "Δες πώς πάει η εξάσκηση: λάθη, κανόνες, σειρά ημερών. Προαιρετικό εβδομαδιαίο email.",
  },
  {
    title: "Λίστες & λεξικό",
    text: "Δημιούργησε δικές σου λίστες λέξεων και δες μικρό λεξικό μετά από λάθη.",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <h2 className="section__title">Τι προσφέρει το Ορθόλεξο</h2>
        <p className="section__lead">
          Μία εφαρμογή, πολλοί τρόποι να εξασκηθείς — με περιεχόμενο από σχολικά
          βιβλία και λεξικά.
        </p>
        <div className="cards cards--2">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="card">
              <h3 className="card__title">{feature.title}</h3>
              <p className="card__text">{feature.text}</p>
            </article>
          ))}
        </div>
        <div className="modes">
          <h3 className="modes__title">Όλοι οι τρόποι εξάσκησης</h3>
          <ul className="modes__list">
            {MODES.map((mode) => (
              <li key={mode} className="modes__item">
                {mode}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
