import styles from './Footer.module.scss';
import { BiNetworkChart } from 'react-icons/bi';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <BiNetworkChart className={styles.icon} />
      <div className={styles.version}>ver. 0.0.1</div>
    </footer>
  );
};
