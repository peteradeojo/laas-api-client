import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { laasApi } from "./services/api";
import { laasAuthApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    [laasApi.reducerPath]: laasApi.reducer,
    [laasAuthApi.reducerPath]: laasAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laasApi.middleware, laasAuthApi.middleware),
});

setupListeners(store.dispatch);
