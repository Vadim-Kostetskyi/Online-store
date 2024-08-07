import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { filesApi } from './filesApi';
import { productsApi } from './productsApi';
import { ordersApi } from './ordersApi';
import {
  reducer as shoppingCartReducer,
  name as shoppingCartName,
} from './slices/shopping-cart';

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [shoppingCartName]: shoppingCartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    productsApi.middleware,
    filesApi.middleware,
    ordersApi.middleware,
  ],
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
