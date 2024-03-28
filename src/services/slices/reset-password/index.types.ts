export type ResetPasswordState = {
  readonly forgotPasswordRequest: boolean;
  readonly forgotPasswordSuccess: boolean;
  readonly forgotPasswordFailed: boolean;

  readonly resetPasswordRequest: boolean;
  readonly resetPasswordSuccess: boolean;
  readonly resetPasswordFailed: boolean;
};
