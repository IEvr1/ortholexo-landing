import { APP_URL } from "../config";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <p className="hero__eyebrow">Εκμάθηση ελληνικής ορθογραφίας</p>
        <h1 className="hero__title">Μάθε να γράφεις σωστά!</h1>
        <p className="hero__subtitle">
          Διαδραστική εξάσκηση για μαθητές <strong>Β΄–Στ΄</strong> Δημοτικού, με 12
          τρόπους παιχνιδιού, έξυπνη επανάληψη και αναφορές για γονείς.
        </p>
        <div className="hero__actions">
          <a href={APP_URL} className="btn btn-primary">
            Ξεκίνα δωρεάν
          </a>
          <span className="hero__badge">🎁 5 ημέρες δωρεάν</span>
        </div>
      </div>
    </section>
  );
}
