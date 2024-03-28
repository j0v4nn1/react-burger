import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import authentication from '../../utils/authentication-api';
import {
  AUTHORIZATION_URL,
  PATH_CONSTRUCTOR_PAGE,
  PATH_FORGOT_PASSWORD_PAGE,
  PATH_REGISTER_PAGE,
} from '../../constants';
import { setAuthData } from '../../utils/utils';
import { logInFailed, logInRequest, logInSuccess } from '../../services/slices/profile/profile';
import { useAppDispatch } from '../../types/hooks';

const Login = () => {
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogIn = () => {
    dispatch(logInRequest());
    authentication(AUTHORIZATION_URL, {
      body: {
        email: emailValue,
        password: passwordValue,
      },
    })
      .then(({ refreshToken, accessToken, user }) => {
        if (refreshToken && accessToken && user) {
          dispatch(logInSuccess());
          setAuthData(dispatch, refreshToken, accessToken, user.name, user.email);
          navigate(PATH_CONSTRUCTOR_PAGE);
        } else {
          throw new Error();
        }
      })
      .catch((error: string) => {
        console.log(error);
        dispatch(logInFailed());
      });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.header}>Вход</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={'password'}
          extraClass="mb-2"
        />
      </form>
      <Button onClick={handleLogIn} extraClass="mt-4" htmlType="button" type="primary" size="large">
        Войти
      </Button>
      <p className="mt-20 mb-6">
        Вы — новый пользователь? <Link to={PATH_REGISTER_PAGE}>Зарегистрироваться</Link>
      </p>
      <p style={{ margin: 0 }}>
        Забыли пароль? <Link to={PATH_FORGOT_PASSWORD_PAGE}>Восстановить пароль</Link>
      </p>
    </section>
  );
};

export default Login;
