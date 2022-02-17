import styles from './Themes.module.scss';
import data from '../../utils/themes.json';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeWindow } from '../../redux/slices/themeWindowSlice';
import { setTheme } from '../../redux/slices/themeSlice';
import { selectTheme } from '../../redux/store';

export const Themes = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.body.setAttribute('data-theme', e.currentTarget.innerText);
  };

  const handleLeave = () => {
    document.body.setAttribute('data-theme', theme);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setTheme(e.currentTarget.innerText));
    dispatch(toggleThemeWindow(false));
  };

  const filterThemes = (themes: string[], query: string) => {
    return themes.map(
      item =>
        item.includes(query) && (
          <li className={styles.themesListItem} key={item}>
            <button
              className={styles.themeBtn}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onClick={handleClick}
              aria-label="Change theme"
            >
              {item}
            </button>
          </li>
        ),
    );
  };

  return (
    <div className={styles.themes}>
      <input
        type="text"
        placeholder="Search for theme..."
        className={styles.search}
        onChange={handleChange}
      />
      <ul className={styles.themesList}>{filterThemes(data.themes, query)}</ul>
    </div>
  );
};
