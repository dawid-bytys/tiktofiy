import axios from 'axios';
import { useState } from 'react';
import type { RecognitionResult } from '@tiktofiy/common';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectSettings } from '../redux/store';

interface UseAudio {
  state: State;
  recognizeAudio: (url: string) => void;
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: RecognitionResult };

/* This hook is not very practical in this project,
 * but I wanted to separate the code as much as possible
 */
export const useAudio = (): UseAudio => {
  const [state, setState] = useState<State>({ status: 'idle' });
  const userSettings = useSelector(selectSettings);

  const recognizeAudio = async (url: string) => {
    setState({
      status: 'loading',
    });

    try {
      const response = await axios.post<RecognitionResult>(BASE_URL, {
        url: url,
        ...userSettings,
      });

      setState({
        status: 'success',
        data: response.data,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setState({
          status: 'error',
          error: err.response?.data.message || 'Something went wrong with the server connection',
        });
      }
    }
  };

  return { state, recognizeAudio };
};
