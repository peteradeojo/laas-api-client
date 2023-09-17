import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./helpers";

const baseUrl = __APP_ENV__.API_URL;

export const laasMetricsApi = createApi({
  reducerPath: "metricsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "/metrics",
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({}),
});

export const {} = laasMetricsApi;
