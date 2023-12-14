import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { laasApi } from './services/api';
import { laasAuthApi } from './services/auth';
import { laasMetricsApi } from './services/metrics';
import { teamsApi } from './services/teams';

export const store = configureStore({
	reducer: {
		[laasApi.reducerPath]: laasApi.reducer,
		[laasAuthApi.reducerPath]: laasAuthApi.reducer,
		[laasMetricsApi.reducerPath]: laasMetricsApi.reducer,
		[teamsApi.reducerPath]: teamsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			laasApi.middleware,
			laasAuthApi.middleware,
			laasMetricsApi.middleware,
			teamsApi.middleware
		),
});

setupListeners(store.dispatch);
