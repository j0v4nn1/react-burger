import updateToken from './updateToken';
import getUserData from './getUserData';
import { getProfileInformationRequest, updateTokenRequest } from '../services/slices/profile/profile';
import { Token } from '../types';
import { AppDispatch } from '../services/store';

const getUserInformation = (dispatch: AppDispatch, accessToken: Token, refreshToken: Token): void => {
  if (accessToken) {
    dispatch(getProfileInformationRequest());
    getUserData(accessToken, dispatch);
  } else {
    if (refreshToken) {
      dispatch(updateTokenRequest());
      updateToken(dispatch);
    }
  }
};

export default getUserInformation;
