import styles from './Glow.module.scss';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeWindow } from '../../redux/slices/themeWindowSlice';
import { selectTheme } from '../../redux/store';

export const Glow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  // Handle escape click
  const handleKeyboardClick = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(toggleThemeWindow(false));
      document.body.setAttribute('data-theme', theme);
    }
  };

  // Handle mouse click
  const handleClickOutside = (e: MouseEvent) => {
    if (glowRef.current?.contains(e.target as Node)) {
      dispatch(toggleThemeWindow(false));
      document.body.setAttribute('data-theme', theme);
    }
  };

  // Add listeners which capture the events
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyboardClick, true);

    // Clean the listeners on leave
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyboardClick, true);
    };
  });

  return <div className={styles.glow} ref={glowRef}></div>;
};
