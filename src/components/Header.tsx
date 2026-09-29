import { APP_URL } from "../config";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#" className="site-header__brand">
          <img src="/icon.svg" alt="" width={40} height={40} className="site-header__logo" />
          <span>Ορθόλεξο</span>
        </a>
        <nav className="site-header__nav" aria-label="Κύρια πλοήγηση">
          <a href="#features">Χαρακτηριστικά</a>
          <a href="#pricing">Τιμές</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href={APP_URL} className="btn btn-primary btn-sm">
          Ξεκίνα
        </a>
      </div>
    </header>
  );
}
