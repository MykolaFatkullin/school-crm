import { baseApi } from '../baseApi';
import { NotificationsMetaResponse } from './response';
import { PageResponse } from '../../model';
import { NotificationsQueryParams } from './request';
import { Notification } from '../../../entities/notifications';
//verified, and be expects on singular
const NOTIFICATIONS_ENDPOINT = '/api/notification';

const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    readNotification: builder.mutation<void, string>({
      query: id => ({
        url: `${NOTIFICATIONS_ENDPOINT}/${id}/read`,
        method: 'PATCH',
      }),
    }),
    readAll: builder.mutation<void, void>({
      query: () => ({
        url: `${NOTIFICATIONS_ENDPOINT}/read-all`,
        method: 'PATCH',
      }),
    }),
    deleteNotifications: builder.mutation<void, void>({
      query: () => ({
        url: `${NOTIFICATIONS_ENDPOINT}/delete`,
        method: 'DELETE',
      }),
    }),
    getAllNotifications: builder.query<
      PageResponse<Notification>,
      NotificationsQueryParams
    >({
      query: ({ page, size }) => ({
        url: `${NOTIFICATIONS_ENDPOINT}/all`,
        params: {
          page: page,
          size: size,
        },
      }),
    }),
    getMeta: builder.query<NotificationsMetaResponse, void>({
      query: () => ({
        url: `${NOTIFICATIONS_ENDPOINT}/meta`,
      }),
    }),
  }),
});

export const {
  useReadNotificationMutation,
  useReadAllMutation,
  useDeleteNotificationsMutation,
  useGetAllNotificationsQuery,
  useGetMetaQuery,
  useLazyGetMetaQuery,
} = notificationsApi;
