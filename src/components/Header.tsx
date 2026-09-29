import { APP_URL } from "../config";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#" className="site-header__brand" aria-label="Ορθόλεξο — αρχική">
          <Logo className="site-header__logo" />
        </a>
        <nav className="site-header__nav" aria-label="Κύρια πλοήγηση">
          <a href="#features">Χαρακτηριστικά</a>
          <a href="#pricing">Τιμές</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Επικοινωνία</a>
        </nav>
        <a href={APP_URL} className="btn btn-primary btn-sm">
          Ξεκίνα
        </a>
      </div>
    </header>
  );
}
