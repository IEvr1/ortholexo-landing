import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container contact-section">
        <h2 className="section__title">Επικοινωνία</h2>
        <p className="section__lead">
          Έχεις ερώτηση; Στείλε μας μήνυμα και θα επικοινωνήσουμε μαζί σου.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
