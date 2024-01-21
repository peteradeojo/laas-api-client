import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './helpers';

const baseUrl = __APP_ENV__.API_URL;

export const teamsApi = createApi({
	reducerPath: 'teamsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + '/teams',
		prepareHeaders: prepareHeaders,
		timeout: 10000,
	}),
	tagTypes: ['Teams', 'Team'],
	endpoints: (builder) => ({
		teams: builder.query({
			query: ({ mine } = { mine: false }) => ({
				url: mine ? '/?mine' : '/',
			}),
			providesTags: ['Teams'],
		}),
		team: builder.query({
			query: (id) => ({
				url: `/${id}/show`,
			}),
			providesTags: (r, err, id) => [{ type: 'Team', id }],
		}),
		createTeam: builder.mutation({
			query: (data) => ({
				url: '/new',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Teams'],
		}),
		addTeamMember: builder.mutation({
			query: (data) => ({
				url: 'add-member',
				method: 'POST',
				body: data,
			}),
		}),
		// acceptInvite: builder.mutation({
		// 	query: (data) => ({
		// 		url: 'accept-invite',
		// 		method: 'POST',
		// 		body: data,
		// 	}),
		// }),
	}),
});

export const {
	useTeamsQuery,
	useTeamQuery,
	useCreateTeamMutation,
	useAddTeamMemberMutation,
} = teamsApi;
