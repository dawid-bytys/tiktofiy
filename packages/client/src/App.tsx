import styles from './App.module.scss';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { Header, Settings, Home, Glow, Themes, Footer } from './utils/grabber';
import { useTransition, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { selectThemeWindow, selectTheme } from './redux/store';
import { useLayoutEffect } from 'react';

export const App = () => {
  const themeWindow = useSelector(selectThemeWindow);
  const theme = useSelector(selectTheme);

  const transition = useTransition(themeWindow, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  // Load the right theme
  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', theme || 'default');
  }, [theme]);

  // Remove any transition until the page is completely loaded
  useLayoutEffect(() => {
    window.addEventListener('load', () => {
      document.body.classList.remove('preload');
    });

    return () => {
      window.removeEventListener('load', () => {
        document.body.classList.remove('preload');
      });
    };
  });

  return (
    <div className={styles.app}>
      <Router>
        <Header />
        {transition(
          ({ opacity }, item) =>
            item && (
              <animated.div style={{ opacity: opacity, zIndex: 998 }}>
                <Glow />
                <Themes />
              </animated.div>
            ),
        )}
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};
