import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { filesApi } from './filesApi';
import { productsApi } from './productsApi';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  reducer as shoppingCartReducer,
  name as shoppingCartName,
} from './slices/shopping-cart/shopping-cart';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [filesApi.reducerPath, productsApi.reducerPath],
};

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [shoppingCartName]: shoppingCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    productsApi.middleware,
    filesApi.middleware,
  ],
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
