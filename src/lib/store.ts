
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage


import cartReducer from './features/cart/CartSlice';
import productsReducer from './features/products/productSlice';
import tokensReducer from './features/tokens/TokenSlice';
import paymentReducer from './features/payment/paymentSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  tokens: tokensReducer,
  payment: paymentReducer
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['*'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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