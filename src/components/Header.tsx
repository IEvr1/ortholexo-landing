import { Link, useLocation } from "react-router-dom";
import { APP_URL } from "../config";
import Logo from "./Logo";

export default function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Ορθόλεξο — αρχική">
          <Logo className="site-header__logo" />
        </Link>
        <nav className="site-header__nav" aria-label="Κύρια πλοήγηση">
          <a href={onHome ? "#features" : "/#features"}>Χαρακτηριστικά</a>
          <a href={onHome ? "#pricing" : "/#pricing"}>Τιμές</a>
          <a href={onHome ? "#faq" : "/#faq"}>FAQ</a>
          <Link to="/articles">Άρθρα</Link>
          <a href={onHome ? "#contact" : "/#contact"}>Επικοινωνία</a>
        </nav>
        <a href={APP_URL} className="btn btn-primary btn-sm">
          Ξεκίνα
        </a>
      </div>
    </header>
  );
}
