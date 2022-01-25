import { themeSlice } from './themeSlice';
import { themeWindowSlice } from './themeWindowSlice';
import { settingsSlice } from './settingsSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    theme: themeSlice.reducer,
    themeWindow: themeWindowSlice.reducer,
    settings: settingsSlice.reducer,
});
