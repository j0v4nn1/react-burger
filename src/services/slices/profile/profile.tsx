import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './profile.types';
import { Token } from '../../../types';

const initialState: ProfileState = {
  profileInformationRequest: false,
  profileInformationSuccess: false,
  profileInformationFailed: false,

  updateTokenRequest: false,
  updateTokenSuccess: false,
  updateTokenFailed: false,

  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,

  logOutRequest: false,
  logOutSuccess: false,
  logOutFailed: false,

  logInRequest: false,
  logInSuccess: false,
  logInFailed: false,

  updateProfileInformationRequest: false,
  updateProfileInformationSuccess: false,
  updateProfileInformationFailed: false,

  profileName: null,
  profileEmail: null,

  isLoggedIn: false,

  accessToken: null,
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileInformationRequest: (state) => {
      state.profileInformationRequest = true;
    },
    getProfileInformationSuccess: (state) => {
      state.profileInformationRequest = false;
      state.profileInformationSuccess = true;
    },
    getProfileInformationFailed: (state) => {
      state.profileInformationRequest = false;
      state.profileInformationFailed = true;
    },

    updateTokenRequest: (state) => {
      state.updateTokenRequest = true;
    },
    updateTokenSuccess: (state) => {
      state.updateTokenRequest = false;
      state.updateTokenSuccess = true;
    },
    updateTokenFailed: (state) => {
      state.updateTokenRequest = false;
      state.updateTokenFailed = true;
    },

    registerRequest: (state) => {
      state.registerRequest = true;
    },
    registerSuccess: (state) => {
      state.registerRequest = false;
      state.registerSuccess = true;
    },
    registerFailed: (state) => {
      state.registerRequest = false;
      state.registerFailed = true;
    },

    logOutRequest: (state) => {
      state.logOutRequest = true;
    },
    logOutSuccess: (state) => {
      state.logOutRequest = false;
      state.logOutSuccess = true;
    },
    logOutFailed: (state) => {
      state.logOutRequest = false;
      state.logOutFailed = true;
    },

    logInRequest: (state) => {
      state.logInRequest = true;
    },
    logInSuccess: (state) => {
      state.logInRequest = false;
      state.logInSuccess = true;
    },
    logInFailed: (state) => {
      state.logInRequest = false;
      state.logInFailed = true;
    },

    updateProfileInformationRequest: (state) => {
      state.updateProfileInformationRequest = true;
    },
    updateProfileInformationSuccess: (state) => {
      state.updateProfileInformationRequest = false;
      state.updateProfileInformationSuccess = true;
    },
    updateProfileInformationFailed: (state) => {
      state.updateProfileInformationRequest = false;
      state.updateProfileInformationFailed = true;
    },

    setAccessToken: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload;
    },
    setProfileName: (state, action: PayloadAction<string>) => {
      state.profileName = action.payload;
    },
    setProfileEmail: (state, action: PayloadAction<string>) => {
      state.profileEmail = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { actions, reducer } = profile;
export const {
  setAccessToken,
  setProfileName,
  setProfileEmail,
  setIsLoggedIn,
  getProfileInformationRequest,
  getProfileInformationSuccess,
  getProfileInformationFailed,
  updateTokenRequest,
  updateTokenSuccess,
  updateTokenFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
  logInRequest,
  logInSuccess,
  logInFailed,
  logOutRequest,
  logOutSuccess,
  logOutFailed,
  updateProfileInformationRequest,
  updateProfileInformationSuccess,
  updateProfileInformationFailed,
} = actions;
export default reducer;
