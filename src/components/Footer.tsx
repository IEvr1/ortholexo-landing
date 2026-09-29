import { appPath } from "../config";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Logo className="site-footer__logo" width={88} height={88} />
        <nav className="site-footer__nav" aria-label="Υποσέλιδο">
          <a href={appPath("/privacy")}>Πολιτική Απορρήτου</a>
          <a href={appPath("/terms")}>Όροι Χρήσης</a>
          <a href="#contact">Επικοινωνία</a>
        </nav>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Ορθόλεξο. Όλα τα δικαιώματα διατηρούνται.
        </p>
      </div>
    </footer>
  );
}
