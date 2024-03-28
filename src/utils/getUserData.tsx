import authentication from './authentication-api';
import { PROFILE_URL } from '../constants';
import {
  getProfileInformationFailed,
  getProfileInformationSuccess,
  setIsLoggedIn,
  setProfileEmail,
  setProfileName,
} from '../services/slices/profile/profile';
import updateToken from './updateToken';
import { Token } from '../types';
import { AppDispatch } from '../services/store';

const getUserData = (accessToken: Token, dispatch: AppDispatch) => {
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
    .catch(() => {
      dispatch(getProfileInformationFailed());
      updateToken(dispatch);
    });
};

export default getUserData;
