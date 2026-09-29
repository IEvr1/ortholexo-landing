export default function Audience() {
  return (
    <section className="section section--alt" id="audience">
      <div className="container">
        <h2 className="section__title">Για ποιον είναι το Ορθόλεξο;</h2>
        <div className="cards cards--3">
          <article className="card">
            <h3 className="card__title">Μαθητές Β΄–Στ΄</h3>
            <p className="card__text">
              Περιεχόμενο ευθυγραμμισμένο με το σχολικό πρόγραμμα (ΚΝΕ). Κάθε τάξη
              έχει τις δικές της λέξεις και κανόνες ορθογραφίας.
            </p>
          </article>
          <article className="card">
            <h3 className="card__title">Γονείς & κηδεμόνες</h3>
            <p className="card__text">
              Ο λογαριασμός δημιουργείται από ενήλικα. Απαιτείται GDPR συναίνεση πριν
              ξεκινήσει η εξάσκηση του παιδιού.
            </p>
          </article>
          <article className="card">
            <h3 className="card__title">Ασφαλές περιβάλλον</h3>
            <p className="card__text">
              Χωρίς διαφημίσεις για παιδιά. Πληρωμή με ασφάλεια μέσω Stripe. Τα
              δεδομένα προόδου συγχρονίζονται στο cloud.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
