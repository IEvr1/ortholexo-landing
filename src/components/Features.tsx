import { type CSSProperties } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const FEATURES = [
  {
    icon: "🎮",
    title: "12 τρόποι εξάσκησης",
    text: "Από πρόταση με κενό μέχρι σύνθεση λέξεων — κάθε τρόπος ενισχύει διαφορετική δεξιότητα.",
  },
  {
    icon: "📅",
    title: "Εβδομαδιαίος κανόνας",
    text: "Κάθε εβδομάδα εστιάζεις σε έναν κανόνα ορθογραφίας με 5 λέξεις — σταδιακή και οργανωμένη μάθηση.",
  },
  {
    icon: "🧠",
    title: "Έξυπνη επανάληψη (FSRS)",
    text: "Ο αλγόριθμος FSRS θυμάται τις λέξεις που δυσκολεύεσαι και τις ξαναφέρνει την κατάλληλη στιγμή.",
  },
  {
    icon: "🏆",
    title: "Σειρές & badges",
    text: "Κράτα το κίνητρο ζωντανό με ημερήσιες σειρές, επιτεύγματα και ορατή πρόοδο.",
  },
  {
    icon: "📊",
    title: "Αναφορά γονέα",
    text: "Δες πώς πάει η εξάσκηση: λάθη, κανόνες, σειρά ημερών. Προαιρετικό εβδομαδιαίο email.",
  },
  {
    icon: "📚",
    title: "Λίστες & λεξικό",
    text: "Δημιούργησε δικές σου λίστες λέξεων και δες μικρό λεξικό μετά από λάθη.",
  },
];

export default function Features() {
  const { ref, isVisible } = useRevealOnScroll<HTMLUListElement>();

  return (
    <section className="section" id="features">
      <div className="container">
        <h2 className="section__title">Τι προσφέρει το Ορθόλεξο</h2>
        <p className="section__lead">
          Μία εφαρμογή με όλα όσα χρειάζεσαι για οργανωμένη εξάσκηση ορθογραφίας.
        </p>
        <ul
          ref={ref}
          className={`icon-card-grid icon-card-grid--features${isVisible ? " is-visible" : ""}`}
        >
          {FEATURES.map((feature, index) => (
            <li
              key={feature.title}
              className="icon-card"
              style={{ "--delay": `${index * 70}ms` } as CSSProperties}
            >
              <span className="icon-card__icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="icon-card__title">{feature.title}</h3>
              <p className="icon-card__text">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
