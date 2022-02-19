import axios from 'axios';
import { useState } from 'react';
import type { RecognitionResult } from '@tiktofiy/common';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectSettings } from '../redux/store';

interface UseAudio {
  audio: RecognitionResult | null;
  error: string | null;
  loading: boolean;
  recognizeAudio: (url: string) => void;
}

/* This hook is not very practical in this project,
 * but I wanted to separate the code as much as possible
 */
export const useAudio = (): UseAudio => {
  const [audio, setAudio] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userSettings = useSelector(selectSettings);

  const recognizeAudio = async (url: string) => {
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
        setError(err.response?.data.message || 'Something went wrong with the server connection');
      }
    } finally {
      setLoading(false);
    }
  };

  return { audio, error, loading, recognizeAudio };
};
