import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.accessToken = action.payload;
    },
    clearAccessToken: state => {
      // eslint-disable-next-line no-param-reassign
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
