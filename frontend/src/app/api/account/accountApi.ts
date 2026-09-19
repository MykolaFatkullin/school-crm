import { baseApi } from '../baseApi';
import { AccountInfoResponse } from './response';
import { ChangePasswordRequest } from './request';

const accountApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<AccountInfoResponse, void>({
      query: () => '/api/account/me',
      providesTags: ['Me'],
    }),

    changeAccountPassword: builder.mutation<void, ChangePasswordRequest>({
      query: ({ oldPassword, newPassword }) => ({
        url: '/api/account/change-password',
        method: 'PATCH',
        body: { oldPassword, newPassword },
      }),
    }),
  }),
});

export const { useMeQuery, useLazyMeQuery, useChangeAccountPasswordMutation } =
  accountApi;
