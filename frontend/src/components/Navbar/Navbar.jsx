import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHidden = scrollDirection === 'down' && !isAtTop && !mobileOpen;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`navbar ${!isAtTop ? 'navbar--solid' : ''}`}
      id="main-navbar"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo hoverable"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-name">MS</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link hoverable"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className={`navbar__burger hoverable ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="navbar-burger"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="navbar__mobile-links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <a
                    href={link.href}
                    className="navbar__mobile-link hoverable"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
