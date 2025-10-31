import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./userSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // menyimpan di localStorage

// Konfigurasi redux-persist
const persistConfig = {
    key: "root",
    storage,
};

// Gabungkan reducer jika ada lebih dari satu
const rootReducer = combineReducers({
    users: userReducer,
});

// Buat persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi store Redux
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// Type helper
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();