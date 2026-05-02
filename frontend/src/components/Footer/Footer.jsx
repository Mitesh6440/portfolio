import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>
            <span className="footer__logo-name">MS</span>
            <span className="footer__logo-bracket">/&gt;</span>
          </span>
          <p className="footer__tagline">Building the future with AI & code</p>
        </div>

        <div className="footer__links">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="footer__link hoverable">
            GitHub
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="footer__link hoverable">
            LinkedIn
          </a>
          <a href="mailto:mitesh@example.com" className="footer__link hoverable">
            Email
          </a>
        </div>

        <div className="footer__divider" />

        <p className="footer__copyright">
          © {currentYear} Mitesh Savaliya. Crafted with passion & code.
        </p>
      </div>
    </footer>
  );
}
