import { useRefreshMutation } from '../../api';
import { setAccessToken, setUnauthenticated } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export const useRefresh = () => {
  const [refreshMutation, refreshState] = useRefreshMutation();
  const dispatch = useDispatch();

  const refresh = useCallback(async () => {
    try {
      const { accessToken } = await refreshMutation().unwrap();

      dispatch(setAccessToken(accessToken));

      return accessToken;
    } catch {
      dispatch(setUnauthenticated());

      return null;
    }
  }, [refreshMutation, dispatch]);

  return {
    refresh,
    isLoading: refreshState.isLoading,
  };
};
