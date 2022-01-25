import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'default';

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (_, action: PayloadAction<string>) => action.payload,
    },
});

export const { setTheme } = themeSlice.actions;
