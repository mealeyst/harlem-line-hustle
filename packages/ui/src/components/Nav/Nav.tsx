import React, { useState } from 'react';
import cx from 'classnames';
import styles from './Nav.module.css';
import { Logo } from '../Logo/Logo';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavProps {
  links: NavLink[];
  logo?: React.ReactNode;
  currentPath?: string;
}

export const Nav: React.FC<NavProps> = ({ links, logo, currentPath = '/' }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logoArea}>
          {logo ?? (
            <a href="/" className={styles.logoText}>
              <Logo renderText={false} size="xs" />
            </a>
          )}
        </div>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={cx(styles.link, { [styles.active]: currentPath === href })}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={cx(styles.bar, { [styles.barTop]: menuOpen })} />
          <span className={cx(styles.bar, { [styles.barMid]: menuOpen })} />
          <span className={cx(styles.bar, { [styles.barBot]: menuOpen })} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className={styles.mobileLinks}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={cx(styles.mobileLink, { [styles.active]: currentPath === href })}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
