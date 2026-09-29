import { APP_URL } from "../config";

const PLANS = [
  {
    id: "yearly",
    title: "Premium — 1 παιδί",
    price: "€49",
    period: "/ έτος",
    highlight: true,
    features: [
      "Όλες οι τάξεις (Β΄–Στ΄)",
      "Όλοι οι τρόποι εξάσκησης",
      "Απεριόριστη εξάσκηση",
      "Συγχρονισμός με άλλες συσκευές",
    ],
  },
  {
    id: "monthly",
    title: "Premium — μηνιαία",
    price: "€5,90",
    period: "/ μήνα",
    features: ["Ίδια δυνατότητες με το ετήσιο", "Ακύρωση ανά πάσα στιγμή"],
  },
  {
    id: "family",
    title: "Οικογενειακό (2–3 παιδιά)",
    price: "€69",
    period: "/ έτος",
    features: [
      "Έως 3 προφίλ παιδιών",
      "Πλήρης πρόσβαση για κάθε παιδί",
      "Συγχρονισμός με άλλες συσκευές",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <h2 className="section__title">Τιμές</h2>
        <p className="section__lead">
          Οι πρώτες <strong>5 ημέρες δωρεάν</strong> με πλήρη πρόσβαση. Η πληρωμή
          γίνεται με ασφάλεια μέσω Stripe.
        </p>
        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`pricing-card${plan.highlight ? " pricing-card--highlight" : ""}`}
            >
              {plan.highlight && <span className="pricing-card__badge">Δημοφιλές</span>}
              <h3 className="pricing-card__title">{plan.title}</h3>
              <p className="pricing-card__price">
                <span className="pricing-card__amount">{plan.price}</span>
                <span className="pricing-card__period">{plan.period}</span>
              </p>
              <ul className="pricing-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="pricing-footnote">
          Χωρίς διαφημίσεις για παιδιά. Η εγγραφή και η πληρωμή γίνονται στην
          εφαρμογή.
        </p>
        <p className="section__cta">
          <a href={APP_URL} className="btn btn-primary">
            Ξεκίνα δωρεάν δοκιμή
          </a>
        </p>
      </div>
    </section>
  );
}
