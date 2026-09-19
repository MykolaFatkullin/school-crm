import { baseApi } from '../baseApi';
import {
  SchoolPaymentSettingsRequest,
  SchoolSmtpSettingsRequest,
} from './request';
import {
  SchoolPaymentSettingsResponse,
  SchoolSmtpSettingsResponse,
} from './response';

const schoolSettingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSmtpSettings: builder.query<SchoolSmtpSettingsResponse, void>({
      query: () => '/api/admin/school/settings/smtp',
    }),

    updateSmtpSettings: builder.mutation<
      SchoolSmtpSettingsResponse,
      SchoolSmtpSettingsRequest
    >({
      query: request => ({
        url: '/api/admin/school/settings/smtp',
        method: 'PUT',
        body: request,
      }),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          schoolSettingsApi.util.upsertQueryData(
            'getSmtpSettings',
            undefined,
            data,
          ),
        );
      },
    }),

    getPaymentSettings: builder.query<SchoolPaymentSettingsResponse, void>({
      query: () => '/api/admin/school/settings/payment',
    }),

    updatePaymentSettings: builder.mutation<
      SchoolPaymentSettingsResponse,
      SchoolPaymentSettingsRequest
    >({
      query: request => ({
        url: '/api/admin/school/settings/payment',
        method: 'PUT',
        body: request,
      }),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          schoolSettingsApi.util.upsertQueryData(
            'getPaymentSettings',
            undefined,
            data,
          ),
        );
      },
    }),
  }),
});

export const {
  useGetSmtpSettingsQuery,
  useUpdateSmtpSettingsMutation,
  useGetPaymentSettingsQuery,
  useUpdatePaymentSettingsMutation,
} = schoolSettingsApi;
