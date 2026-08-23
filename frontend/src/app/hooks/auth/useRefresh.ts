import { useRefreshMutation } from '../../api';

export const useRefresh = () => {
  const [refreshMutation, refreshState] = useRefreshMutation();

  const refresh = async () => {
    return await refreshMutation().unwrap();
  };

  return {
    refresh,
    isLoading: refreshState.isLoading,
  };
};
