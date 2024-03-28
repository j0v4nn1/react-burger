import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../types/hooks';
import { ProtectedRouteAuthorizedComponent } from './protected-route-authorized.types';
import { PATH_CONSTRUCTOR_PAGE } from '../../constants';

const ProtectedRouteAuthorized: React.FC<ProtectedRouteAuthorizedComponent> = ({ element }) => {
  const accessToken = useAppSelector((store) => store.profile.accessToken);
  const navigate = useNavigate();

  const init = () => {
    if (accessToken) {
      navigate(PATH_CONSTRUCTOR_PAGE);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, [accessToken]);

  return <>{element}</>;
};

export default ProtectedRouteAuthorized;
