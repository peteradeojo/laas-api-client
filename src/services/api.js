import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
	'Content-type': 'application/json',
	Accept: 'application/json',
};

const baseUrl = __APP_ENV__.API_URL;

const getAuthToken = () => localStorage.getItem('authToken');

export const laasApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: 'auth/login',
				method: 'POST',
				body,
				headers,
			}),
		}),
		signup: builder.mutation({
			query: (body) => ({
				url: 'auth/register',
				method: 'POST',
				body,
				headers,
			}),
		}),

		getUser: builder.query({
			query: () => ({
				url: 'auth',
				method: 'GET',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}),
		}),

		getApps: builder.query({
			query: () => ({
				url: 'apps',
				method: 'GET',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}),
		}),

		getApp: builder.query({
			query: (id) => ({
				url: 'apps/' + id,
				method: 'GET',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}),
		}),

		getAppLogs: builder.query({
			query: ({ appId, page = 1, count = 20, filter }) => {
				return {
					url: `logs/${appId}?page=${page}&count=${count}&level=${
						filter?.level || ''
					}&search=${filter?.search || ''}`,
					method: 'GET',
					headers: {
						...headers,
						Authorization: `Bearer ${getAuthToken()}`,
					},
				};
			},
		}),

		createApp: builder.mutation({
			query: (body) => ({
				url: 'apps/new',
				method: 'POST',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
				body,
			}),
		}),

		generareAppToken: builder.mutation({
			query: (appId) => ({
				url: `apps/${appId}/token`,
				method: 'POST',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}),
		}),

		deleteLog: builder.mutation({
			query: (logId) => ({
				url: `logs/${logId}/delete`,
				method: 'DELETE',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}),
		}),

		clearLogs: builder.mutation({
			query: (appId) => ({
				url: `logs/${appId}`,
				method: 'DELETE',
				headers: {
					...headers,
					Authorization: `Bearer ${getAuthToken()}`,
				},
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
} = laasApi;
