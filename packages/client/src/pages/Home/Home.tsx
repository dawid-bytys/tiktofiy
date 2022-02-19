import styles from './Home.module.scss';
import { useState } from 'react';
import { File } from 'react-kawaii';
import { Error } from '../../utils/grabber';
import { isSongFound } from '@tiktofiy/common';
import { ReactComponent as ListenOnSpotify } from '../../assets/svg/spotify.svg';
import { useAudio } from '../../hooks/useAudio';

export const Home = () => {
  const [url, setUrl] = useState('');
  const { audio, error, loading, recognizeAudio } = useAudio();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    recognizeAudio(url);
  };

  return (
    <main className={styles.home}>
      {error && <Error message={error} />}
      <form
        className={loading ? `${styles.form} ${styles.formDisabled}` : `${styles.form}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className={styles.input}
          placeholder="Paste a TikTok url..."
          onChange={handleChange}
        />
        <button type="submit" className={styles.submitBtn} aria-label="Submit">
          Find a song
        </button>
      </form>
      {audio ? (
        <div
          className={isSongFound(audio) ? `${styles.resultsFound}` : `${styles.resultsNotFound}`}
        >
          {!isSongFound(audio) && <File size={70} mood="ko" color="#f6f0e9" />}
          <p className={styles.description}>
            {isSongFound(audio)
              ? 'look what we have just found for you:'
              : "sorry, we weren't able to find anything, try again"}
          </p>
          {isSongFound(audio) && (
            <>
              <img src={audio.albumImage} alt="Album" className={styles.album} />
              <p className={styles.song}>
                {audio.artist} - {audio.title}
              </p>
              {audio.spotify && (
                <a href={audio.spotify} rel="noreferrer noopener" className={styles.spotifyLink}>
                  <ListenOnSpotify className={styles.spotifyImage} />
                </a>
              )}
            </>
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <File size={70} mood="ko" color="#f6f0e9" />
          <p className={styles.description}>come on... search for something</p>
        </div>
      )}
    </main>
  );
};
