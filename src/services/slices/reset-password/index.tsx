import { createSlice } from '@reduxjs/toolkit';
import { ResetPasswordState } from './index.types';

const initialState: ResetPasswordState = {
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
};

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    forgotPasswordRequest: (state) => {
      state.forgotPasswordRequest = true;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordRequest = false;
      state.forgotPasswordSuccess = true;
    },
    forgotPasswordFailed: (state) => {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = true;
    },
    resetPasswordRequest: (state) => {
      state.resetPasswordRequest = true;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordRequest = false;
      state.resetPasswordSuccess = true;
    },
    resetPasswordFailed: (state) => {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = true;
    },
  },
});

export const { actions, reducer } = resetPassword;
export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = actions;
export default reducer;
