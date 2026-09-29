import { APP_URL } from "../config";

const STEPS = [
  {
    step: "1",
    title: "Εγγραφή γονέα",
    text: "Δημιούργησε λογαριασμό και αποδέξου τη συναίνεση GDPR για το παιδί σου.",
  },
  {
    step: "2",
    title: "Προφίλ παιδιού",
    text: "Πρόσθεσε το όνομα και την τάξη (Β΄–Στ΄). Έως 3 παιδιά στο οικογενειακό πλάνο.",
  },
  {
    step: "3",
    title: "Ξεκίνα την εξάσκηση",
    text: "Διάλεξε τάξη, τρόπο εξάσκησης και παίξε — η πρόοδος αποθηκεύεται αυτόματα.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section--alt" id="how-it-works">
      <div className="container">
        <h2 className="section__title">Πώς λειτουργεί</h2>
        <ol className="steps">
          {STEPS.map((item) => (
            <li key={item.step} className="steps__item">
              <span className="steps__number" aria-hidden="true">
                {item.step}
              </span>
              <div>
                <h3 className="steps__title">{item.title}</h3>
                <p className="steps__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="section__cta">
          <a href={APP_URL} className="btn btn-primary">
            Ξεκίνα τώρα
          </a>
        </p>
      </div>
    </section>
  );
}
