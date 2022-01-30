import React, { useState } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';
import { File } from 'react-kawaii';
import { Error } from '../../utils/grabber';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../redux/store';
import type { RecognitionResult } from '@tiktofiy/common';
import { isSongFound } from '@tiktofiy/common';

const BASE_URL = '/api/v1/audio/recognize';

export const Home = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState<RecognitionResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const userSettings = useSelector(selectSettings);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<RecognitionResult>(BASE_URL, {
                url: url,
                ...userSettings,
            });

            setAudio(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
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
                <button type="submit" className={styles.submitBtn}>
                    Find a song
                </button>
            </form>
            {audio ? (
                <div
                    className={
                        isSongFound(audio) ? `${styles.resultsFound}` : `${styles.resultsNotFound}`
                    }
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
