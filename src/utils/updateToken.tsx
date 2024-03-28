import authentication from './authentication-api';
import { PROFILE_URL, REFRESH_TOKEN_URL } from '../constants';
import {
  getProfileInformationRequest,
  getProfileInformationSuccess,
  getProfileInformationFailed,
  setAccessToken,
  setIsLoggedIn,
  setProfileEmail,
  setProfileName,
  updateTokenSuccess,
  updateTokenFailed,
} from '../services/slices/profile/profile';
import { AppDispatch } from '../services/store';
import { Token } from '../types';

const refreshToken = localStorage.getItem('refreshToken');

const updateToken = (dispatch: AppDispatch) => {
  const parsedRefreshToken: Token = refreshToken ? JSON.parse(refreshToken) : null;
  authentication(REFRESH_TOKEN_URL, {
    body: {
      token: parsedRefreshToken,
    },
  })
    .then(({ accessToken, refreshToken }) => {
      if (accessToken) {
        dispatch(updateTokenSuccess());
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        dispatch(setAccessToken(accessToken));
        dispatch(getProfileInformationRequest());
        authentication(PROFILE_URL, {
          method: 'GET',
          headers: {
            authorization: accessToken,
          },
        })
          .then(({ user }) => {
            if (user) {
              dispatch(getProfileInformationSuccess());
              dispatch(setProfileName(user.name));
              dispatch(setProfileEmail(user.email));
              dispatch(setIsLoggedIn(true));
            } else {
              throw new Error();
            }
          })
          .catch((error: string) => {
            dispatch(getProfileInformationFailed());
            console.log(error);
          });
      } else {
        throw new Error();
      }
    })
    .catch((error: string) => {
      dispatch(updateTokenFailed());
      console.log(error);
    });
};

export default updateToken;
