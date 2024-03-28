import styles from './profile.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import authentication from '../../utils/authentication-api';
import { LOGOUT_URL, PATH_PROFILE_PAGE } from '../../constants';
import {
  setIsLoggedIn,
  setAccessToken,
  logOutRequest,
  logOutSuccess,
  logOutFailed,
} from '../../services/slices/profile/profile';
import ProfileForm from '../profile-form/profile-form';
import Orders from '../orders/orders';
import ProtectedRouteElement from '../../components/protected-route-element/protected-route-element';
import { useAppDispatch } from '../../types/hooks';
import { Token } from '../../types';

const Profile = () => {
  const dispatch = useAppDispatch();
  const refreshToken: Token = localStorage.getItem('refreshToken');

  const handleLogOut = () => {
    try {
      if (refreshToken) {
        const parsedRefreshToken = JSON.parse(refreshToken);
        dispatch(logOutRequest());
        authentication(LOGOUT_URL, {
          body: {
            token: parsedRefreshToken,
          },
        })
          .then(() => {
            dispatch(logOutSuccess());
            localStorage.removeItem('refreshToken');
            dispatch(setAccessToken(null));
            dispatch(setIsLoggedIn(false));
          })
          .catch((error: string) => {
            dispatch(logOutFailed());
            console.log(error);
          });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.menuWrapper}>
          <ul className={styles.menu}>
            <li>
              <NavLink
                end
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary-color)' : 'var(--text-inactive-color)',
                })}
                className={classNames(styles.link, 'text_type_main-medium')}
                to={PATH_PROFILE_PAGE}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary-color)' : 'var(--text-inactive-color)',
                })}
                to={'/profile/orders'}
                className={classNames(styles.link, 'text_type_main-medium')}>
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleLogOut}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary-color)' : 'var(--text-inactive-color)',
                })}
                to={'/login'}
                className={classNames(styles.link, 'text_type_main-medium')}>
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={classNames(styles.paragraph, 'text text_type_main-small')}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/orders/*" element={<ProtectedRouteElement element={<Orders />} />} />
        </Routes>
      </div>
    </>
  );
};

export default Profile;
