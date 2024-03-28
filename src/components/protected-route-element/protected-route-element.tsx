import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import getUserData from '../../utils/getUserData';
import updateToken from '../../utils/updateToken';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { ProtectedRouteComponent } from './protected-route-element.types';
import { PATH_LOGIN_PAGE } from '../../constants';

const ProtectedRouteElement: React.FC<ProtectedRouteComponent> = ({ element }) => {
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = useAppSelector((store) => store.profile.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      getUserData(accessToken, dispatch);
    } else if (refreshToken) {
      updateToken(dispatch);
    } else {
      navigate(PATH_LOGIN_PAGE);
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return <>{element}</>;
};
export default ProtectedRouteElement;
