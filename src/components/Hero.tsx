import { APP_URL } from "../config";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <Logo className="hero__logo" width={320} height={320} />
        <h1 className="visually-hidden">Ορθόλεξο — Μάθε να γράφεις σωστά!</h1>
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
