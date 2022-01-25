import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices/index';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['themeWindow'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

type RootState = ReturnType<typeof store.getState>;

// Export selectors
export const selectTheme = (state: RootState) => state.theme;
export const selectThemeWindow = (state: RootState) => state.themeWindow;
export const selectSettings = (state: RootState) => state.settings;
