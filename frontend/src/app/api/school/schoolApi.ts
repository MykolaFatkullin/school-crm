import { baseApi } from '../baseApi';
import { School } from '../../../entities/school';

const schoolApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSchool: builder.query<School, void>({
      query: () => '/api/admin/school',
    }),

    updateSchool: builder.mutation<School, School>({
      query: school => ({
        url: '/api/admin/school',
        method: 'PUT',
        body: school,
      }),
      async onQueryStarted(_school, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(schoolApi.util.upsertQueryData('getSchool', undefined, data));
      },
    }),
  }),
});

export const { useGetSchoolQuery, useUpdateSchoolMutation } = schoolApi;
