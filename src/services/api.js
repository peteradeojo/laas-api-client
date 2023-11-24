import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = __APP_ENV__.API_URL;

import { prepareHeaders } from "./helpers";

export const laasApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: prepareHeaders,
    timeout: 10000
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 2 * 60,
  tagTypes: ["Apps", "Auth", "User"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: "auth",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getApps: builder.query({
      query: () => ({
        url: "apps",
        method: "GET",
      }),
      providesTags: ["Apps"],
    }),

    getApp: builder.query({
      query: (id) => ({
        url: "apps/" + id,
        method: "GET",
      }),
      providesTags: ["App"],
    }),

    getAppLogs: builder.query({
      query: ({ appId, page = 1, count = 20, filter }) => {
        return {
          url: `logs/${appId}?page=${page}&count=${count}&level=${
            filter?.level || ""
          }&search=${filter?.search || ""}`,
          method: "GET",
        };
      },
      providesTags: ["Logs"],
    }),

    createApp: builder.mutation({
      query: (body) => ({
        url: "apps/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Apps"],
    }),

    generareAppToken: builder.mutation({
      query: (appId) => ({
        url: `apps/${appId}/token`,
        method: "POST",
      }),
    }),

    deleteLog: builder.mutation({
      query: (logId) => ({
        url: `logs/${logId}/delete`,
        method: "DELETE",
      }),
    }),

    clearLogs: builder.mutation({
      query: (appId) => ({
        url: `logs/${appId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logs"],
    }),

    updateApp: builder.mutation({
      query: (data) => ({
        url: `apps/${data.id}/update`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: (result, error, arg) => ["Apps", "App"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => ["User"],
    }),

    setup2Fa: builder.mutation({
      query: (data) => ({
        url: `auth/2fa/setup`,
      }),
    }),
    enable2Fa: builder.mutation({
      query: (data) => ({
        url: `auth/2fa/enable`,
        method: "POST",
        body: data,
      }),
    }),
    verify2Fa: builder.mutation({
      query: (data) => ({
        url: `auth/2fa/verify`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useGetAppsQuery,
  useGetAppQuery,
  useGetAppLogsQuery,
  useCreateAppMutation,
  useGenerareAppTokenMutation,
  useDeleteLogMutation,
  useClearLogsMutation,
  useUpdateAppMutation,
  useUpdateProfileMutation,
  useSetup2FaMutation,
  useEnable2FaMutation,
  useVerify2FaMutation,
} = laasApi;
