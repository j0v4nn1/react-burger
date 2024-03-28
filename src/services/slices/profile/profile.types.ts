import { Token } from '../../../types';

export type ProfileState = {
  readonly profileInformationRequest: boolean;
  readonly profileInformationSuccess: boolean;
  readonly profileInformationFailed: boolean;

  readonly updateTokenRequest: boolean;
  readonly updateTokenSuccess: boolean;
  readonly updateTokenFailed: boolean;

  readonly registerRequest: boolean;
  readonly registerSuccess: boolean;
  readonly registerFailed: boolean;

  readonly logOutRequest: boolean;
  readonly logOutSuccess: boolean;
  readonly logOutFailed: boolean;

  readonly logInRequest: boolean;
  readonly logInSuccess: boolean;
  readonly logInFailed: boolean;

  readonly updateProfileInformationRequest: boolean;
  readonly updateProfileInformationSuccess: boolean;
  readonly updateProfileInformationFailed: boolean;

  readonly profileName: null | string;
  readonly profileEmail: null | string;

  readonly isLoggedIn: boolean;

  readonly accessToken: Token;
};
