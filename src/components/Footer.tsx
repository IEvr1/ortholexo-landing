import { CONTACT_EMAIL, appPath } from "../config";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="/icon.svg" alt="" width={36} height={36} />
          <span>Ορθόλεξο</span>
        </div>
        <p className="site-footer__nexaipla">
          Ένα προϊόν της{" "}
          <a href="https://www.nexaipla.com" target="_blank" rel="noopener noreferrer">
            NexAIpla
          </a>
        </p>
        <nav className="site-footer__nav" aria-label="Νομικά">
          <a href={appPath("/privacy")}>Πολιτική Απορρήτου</a>
          <a href={appPath("/terms")}>Όροι Χρήσης</a>
          <a href={appPath("/contact")}>Επικοινωνία</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} NexAIpla. Όλα τα δικαιώματα διατηρούνται.
        </p>
      </div>
    </footer>
  );
}
