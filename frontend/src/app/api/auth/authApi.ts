import { baseApi } from '../baseApi';
import {
  AccessTokenResponse,
  RegistrationResponse,
  UserVerificationResponse,
} from './response';
import {
  LoginRequest,
  MailTokenRequest,
  RegistrationRequest,
  ResendVerificationMailRequest,
  ResetPasswordRequest,
  VerifyTokenRequest,
} from './request';
import { setAccessToken } from '../../store/authSlice';
import { ChangePasswordRequest } from './request/ChangePasswordRequest';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body: body,
      }),
    }),

    resendVerificationMail: builder.mutation<
      void,
      ResendVerificationMailRequest
    >({
      query: body => ({
        url: '/auth/resend-verification-by-email',
        method: 'POST',
        body: body,
      }),
    }),

    verifyMailToken: builder.mutation<
      UserVerificationResponse,
      VerifyTokenRequest
    >({
      query: body => ({
        url: `/auth/verify-mail-token`,
        method: 'POST',
        body: body,
      }),
    }),

    resendMailByToken: builder.mutation<
      UserVerificationResponse,
      MailTokenRequest
    >({
      query: body => ({
        url: `/auth/resend-verification-by-token`,
        method: 'POST',
        body: body,
      }),
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: body => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: body,
      }),
    }),

    login: builder.mutation<AccessTokenResponse, LoginRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        dispatch(setAccessToken(data.accessToken));
      },
    }),

    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: body => ({
        url: '/auth/change-password',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useResendVerificationMailMutation,
  useVerifyMailTokenMutation,
  useResendMailByTokenMutation,
  useResetPasswordMutation,
  useLoginMutation,
  useChangePasswordMutation,
} = authApi;
