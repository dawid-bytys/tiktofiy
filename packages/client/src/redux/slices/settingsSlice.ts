import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    shazamApiKey: string;
    start: string;
    end: string;
}

const initialState: InitialState = {
    shazamApiKey: '',
    start: '0',
    end: '0',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Partial<InitialState>>) => ({
            ...state,
            ...action.payload,
        }),
    },
});

export const { setSettings } = settingsSlice.actions;
