import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMeQuery } from '../api/account/accountApi';
import { setAuthenticated, setUnauthenticated } from '../store/authSlice';
import { LoadingPage } from '../../pages/loadingPage';
import { useGetNotificationsMeta } from './hooks/useGetNotificationsMeta';

interface Props {
  children: React.ReactNode;
  refreshSucceeded: boolean;
}

export const AuthInitializer = ({ children, refreshSucceeded }: Props) => {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError } = useMeQuery(undefined, {
    skip: !refreshSucceeded,
  });

  const isNotificationsMetaLoading = useGetNotificationsMeta(!refreshSucceeded);

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

  if (refreshSucceeded && (isLoading || isNotificationsMetaLoading)) {
    return <LoadingPage />;
  }

  return children;
};
