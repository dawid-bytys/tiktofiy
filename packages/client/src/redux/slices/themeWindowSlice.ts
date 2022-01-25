import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

export const themeWindowSlice = createSlice({
    name: 'themeWindow',
    initialState,
    reducers: {
        toggleThemeWindow: (_, action: PayloadAction<boolean>) => action.payload,
    },
});

export const { toggleThemeWindow } = themeWindowSlice.actions;
