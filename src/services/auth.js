import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = __APP_ENV__.API_URL;

export const laasAuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "/auth",
    timeout: 10000
  }),
  endpoints: (builder) => ({
    githubLogin: builder.mutation({
      query: () => ({
        url: "github",
      }),
    }),
    githubLoginCallback: builder.query({
      query: ({ code }) => ({
        url: "github/callback?code=" + code,
        method: "GET",
      }),
    }),
  }),
});

export const { useGithubLoginMutation, useGithubLoginCallbackQuery } =
  laasAuthApi;
