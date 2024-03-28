import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './forgot-password.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authentication from '../../utils/authentication-api';
import { PATH_LOGIN_PAGE, PATH_RESET_PASSWORD_PAGE, RESET_PASSWORD_URL } from '../../constants';
import {
  forgotPasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
} from '../../services/slices/reset-password';
import { useAppDispatch } from '../../types/hooks';

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleResetPassword = () => {
    dispatch(forgotPasswordRequest());
    authentication(RESET_PASSWORD_URL, {
      body: {
        email: emailValue,
      },
    })
      .then(() => {
        dispatch(forgotPasswordSuccess());
        navigate(PATH_RESET_PASSWORD_PAGE, { state: location.pathname });
      })
      .catch((error: string) => {
        dispatch(forgotPasswordFailed());
        console.log(error);
      });
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.header}>Восстановление пароля</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
      </form>
      <Button onClick={handleResetPassword} extraClass="mt-4" htmlType="button" type="primary" size="large">
        Восстановить
      </Button>
      <p className="mt-20 mb-6">
        Вспомнили пароль? <Link to={PATH_LOGIN_PAGE}>Войти</Link>
      </p>
    </main>
  );
};

export default ForgotPassword;
