import { useLogoutMutation } from '../../../../../api';
import { useDispatch } from 'react-redux';
import { setUnauthenticated } from '../../../../../store/authSlice';

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();

    dispatch(setUnauthenticated());

    window.location.reload();
  };

  return { handleLogout };
};
