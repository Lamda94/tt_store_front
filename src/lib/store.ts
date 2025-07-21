// lib/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage

// Importa tus reducers
import cartReducer from './features/cart/CartSlice';
import productsReducer from './features/products/productSlice';

// 1. Combina tus reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

// 2. Configuración de la persistencia
const persistConfig = {
  key: 'root', // La clave principal en el storage
  storage,
  whitelist: ['cart'], // 👈 ¡IMPORTANTE! Solo persiste el slice 'cart'. No guardes todo.
};

// 3. Crea el reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configura la tienda con el reducer persistido
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Exporta el persistor
export const persistor = persistStore(store);