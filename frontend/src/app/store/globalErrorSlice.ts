import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GlobalErrorType = 'SERVER_ERROR' | 'NETWORK_ERROR';

type GlobalErrorState = {
  type: GlobalErrorType | null;
};

const initialState: GlobalErrorState = {
  type: null,
};

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<GlobalErrorType>) => {
      // eslint-disable-next-line no-param-reassign
      state.type = action.payload;
    },
    clearGlobalError: state => {
      // eslint-disable-next-line no-param-reassign
      state.type = null;
    },
  },
});

export const { setGlobalError, clearGlobalError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
