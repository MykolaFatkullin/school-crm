import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../../shared/config';
import { RootState } from '../store/store';
import { clearAccessToken, setAccessToken } from '../store/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const isAuthEndpoint = (rawUrl: string) => {
  try {
    const pathname = new URL(rawUrl, 'http://localhost').pathname;

    return pathname === '/auth' || pathname.startsWith('/auth/');
  } catch {
    return rawUrl === '/auth' || rawUrl.startsWith('/auth/');
  }
};

let refreshPromise: Promise<boolean> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const url = typeof args === 'string' ? args : args.url;

  if (result.error?.status === 401 && !isAuthEndpoint(url)) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh',
              method: 'POST',
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const { accessToken } = refreshResult.data as {
              accessToken: string;
            };

            api.dispatch(setAccessToken(accessToken));

            return true;
          } else {
            api.dispatch(clearAccessToken());

            return false;
          }
        } catch {
          api.dispatch(clearAccessToken());

          return false;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const refreshSuccess = await refreshPromise;

    if (refreshSuccess) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
});
