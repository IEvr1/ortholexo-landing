import { Link } from "react-router-dom";
import { HOME_FAQ_PREVIEW } from "../constants/faq";

export default function FAQ() {
  return (
    <section className="section section--alt" id="faq">
      <div className="container">
        <h2 className="section__title">Συχνές ερωτήσεις</h2>
        <dl className="faq">
          {HOME_FAQ_PREVIEW.map((item) => (
            <div key={item.q} className="faq__item">
              <dt className="faq__question">{item.q}</dt>
              <dd className="faq__answer">{item.a}</dd>
            </div>
          ))}
        </dl>
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/faq">Όλες οι συχνές ερωτήσεις →</Link>
        </p>
      </div>
    </section>
  );
}
