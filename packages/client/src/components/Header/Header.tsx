import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { FiSettings, FiHome } from 'react-icons/fi';
import { RiPaletteLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toggleThemeWindow } from '../../redux/slices/themeWindowSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPage = useMemo(() => (location.pathname === '/' ? 'home' : 'settings'), [location]);

  return (
    <header className={styles.header}>
      <div className={styles.headerUpper}>
        <Logo className={styles.logo} />
        <div className={styles.title}>Tiktofiy!</div>
      </div>
      <nav className={styles.navigation}>
        <Link
          to="/"
          className={
            currentPage === 'home' ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
          }
        >
          <FiHome className={styles.icon} />
        </Link>
        <Link
          to="/settings"
          className={
            currentPage === 'settings' ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
          }
        >
          <FiSettings className={styles.icon} />
        </Link>
        <button className={styles.themeBtn} onClick={() => dispatch(toggleThemeWindow(true))}>
          <RiPaletteLine className={styles.icon} />
        </button>
      </nav>
    </header>
  );
};
