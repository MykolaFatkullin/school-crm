import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMeQuery } from '../api/account/accountApi';
import { useGetSchoolQuery } from '../api/school/schoolApi';
import { setAuthenticated, setUnauthenticated } from '../store/authSlice';
import { LoadingPage } from '../../pages/loadingPage';
import { useGetNotificationsMeta } from './hooks/useGetNotificationsMeta';
import { RootState } from '../store/store';

interface Props {
  children: React.ReactNode;
  refreshSucceeded: boolean;
}

export const AuthInitializer = ({ children, refreshSucceeded }: Props) => {
  const dispatch = useDispatch();

  const authStatus = useSelector((state: RootState) => state.auth.status);
  const skipAccountQueries =
    !refreshSucceeded || authStatus === 'unauthenticated';

  const { isLoading, isSuccess, isError } = useMeQuery(undefined, {
    skip: skipAccountQueries,
  });

  const { isLoading: isSchoolLoading } = useGetSchoolQuery(undefined, {
    skip: skipAccountQueries,
  });

  const isNotificationsMetaLoading =
    useGetNotificationsMeta(skipAccountQueries);

  useEffect(() => {
    if (!refreshSucceeded) {
      dispatch(setUnauthenticated());

      return;
    }

    if (isSuccess) {
      dispatch(setAuthenticated());
    }

    if (isError) {
      dispatch(setUnauthenticated());
    }
  }, [refreshSucceeded, isSuccess, isError, dispatch]);

  const isApiLoading =
    isLoading || isSchoolLoading || isNotificationsMetaLoading;

  if (refreshSucceeded && isApiLoading) {
    return <LoadingPage />;
  }

  return children;
};
