import { baseApi } from '../baseApi';
import { AccountInfoResponse } from './response';

const accountApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<AccountInfoResponse, void>({
      query: () => '/api/account/me',
      providesTags: ['Me'],
    }),
  }),
});

export const { useMeQuery, useLazyMeQuery } = accountApi;
