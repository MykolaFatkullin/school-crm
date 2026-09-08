import { useLogoutMutation } from '../../../../../api';
import { useDispatch } from 'react-redux';
import { setUnauthenticated } from '../../../../../store/authSlice';
import { baseApi } from '../../../../../api/baseApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../shared/config';

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(setUnauthenticated());
      dispatch(baseApi.util.resetApiState());
      navigate(ROUTES.HOME);
    }
  };

  return { handleLogout };
};
