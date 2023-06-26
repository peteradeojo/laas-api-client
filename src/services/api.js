import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = __APP_ENV__.API_URL;

const getAuthToken = () => localStorage.getItem('authToken');

export const laasApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			const token = getAuthToken();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			headers.set('Content-type', 'application/json');
			headers.set('Accept', 'application/json');
			return headers;
		},
	}),
	refetchOnReconnect: true,
	keepUnusedDataFor: 2 * 60,
	tagTypes: ['Apps'],

	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: 'auth/login',
				method: 'POST',
				body,
			}),
		}),
		signup: builder.mutation({
			query: (body) => ({
				url: 'auth/register',
				method: 'POST',
				body,
			}),
		}),

		getUser: builder.query({
			query: () => ({
				url: 'auth',
				method: 'GET',
			}),
		}),

		getApps: builder.query({
			query: () => ({
				url: 'apps',
				method: 'GET',
			}),
			providesTags: ['Apps'],
		}),

		getApp: builder.query({
			query: (id) => ({
				url: 'apps/' + id,
				method: 'GET',
			}),
			providesTags: ['App'],
		}),

		getAppLogs: builder.query({
			query: ({ appId, page = 1, count = 20, filter }) => {
				return {
					url: `logs/${appId}?page=${page}&count=${count}&level=${
						filter?.level || ''
					}&search=${filter?.search || ''}`,
					method: 'GET',
				};
			},
			providesTags: ['Logs'],
		}),

		createApp: builder.mutation({
			query: (body) => ({
				url: 'apps/new',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Apps'],
		}),

		generareAppToken: builder.mutation({
			query: (appId) => ({
				url: `apps/${appId}/token`,
				method: 'POST',
			}),
		}),

		deleteLog: builder.mutation({
			query: (logId) => ({
				url: `logs/${logId}/delete`,
				method: 'DELETE',
			}),
		}),

		clearLogs: builder.mutation({
			query: (appId) => ({
				url: `logs/${appId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Logs'],
		}),

		updateApp: builder.mutation({
			query: (data) => ({
				url: `apps/${data.id}/update`,
				method: 'PATCH',
				body: data.body,
			}),
			invalidatesTags: (result, error, arg) => ['Apps', 'App'],
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
} = laasApi;
