import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { laasApi } from './services/api';

export const store = configureStore({
	reducer: {
		[laasApi.reducerPath]: laasApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(laasApi.middleware),
});

setupListeners(store.dispatch);
