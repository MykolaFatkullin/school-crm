import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface AuthState {
  accessToken: string | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  accessToken: null,
  status: 'unknown',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.accessToken = action.payload;
    },

    setAuthenticated: state => {
      // eslint-disable-next-line no-param-reassign
      state.status = 'authenticated';
    },

    setUnauthenticated: state => {
      // eslint-disable-next-line no-param-reassign
      state.accessToken = null;
      // eslint-disable-next-line no-param-reassign
      state.status = 'unauthenticated';
    },
  },
});

export const { setAccessToken, setAuthenticated, setUnauthenticated } =
  authSlice.actions;

export default authSlice.reducer;
