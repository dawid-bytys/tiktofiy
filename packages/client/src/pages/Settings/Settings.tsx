import React from 'react';
import styles from './Settings.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings } from '../../redux/store';
import { setSettings } from '../../redux/slices/settingsSlice';

export const Settings = () => {
  const dispatch = useDispatch();
  const userSettings = useSelector(selectSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setSettings({
        ...userSettings,
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    );
  };

  return (
    <main className={styles.settings}>
      <div className={styles.group}>
        <div className={styles.label}>shazam api key</div>
        <div className={styles.option}>
          <input
            type="password"
            className={styles.keyInput}
            name="shazamApiKey"
            placeholder="paste your key..."
            onChange={handleChange}
            defaultValue={userSettings.shazamApiKey}
          />
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.label}>audio range</div>
        <div className={styles.option}>
          <input
            type="number"
            className={styles.rangeInput}
            name="start"
            placeholder="start"
            onChange={handleChange}
            defaultValue={userSettings.start}
          />
          <input
            type="number"
            className={styles.rangeInput}
            name="end"
            placeholder="end"
            onChange={handleChange}
            defaultValue={userSettings.end}
          />
        </div>
      </div>
    </main>
  );
};
