import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = 'default';

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (_, action: PayloadAction<string>) => action.payload,
    },
});

export const { setTheme } = themeSlice.actions;
