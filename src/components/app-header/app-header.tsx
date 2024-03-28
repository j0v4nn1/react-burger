import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../types/hooks';
import { PATH_CONSTRUCTOR_PAGE, PATH_FEED, PATH_LOGIN_PAGE, PATH_PROFILE_PAGE } from '../../constants';

const AppHeader = () => {
  const isLoggedIn = useAppSelector((store) => store.profile.isLoggedIn);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <BurgerIcon type="primary" />
              <NavLink
                to={PATH_CONSTRUCTOR_PAGE}
                className={styles.link}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary-color)' : 'var(--text-inactive-color)',
                })}>
                Конструктор
              </NavLink>
            </li>
            <li className={styles.item}>
              <ListIcon type="secondary" />
              <NavLink
                to={PATH_FEED}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary-color)' : 'var(--text-inactive-color)',
                })}
                className={styles.link}>
                Лента заказов
              </NavLink>
            </li>
          </ul>
          <Logo />
        </nav>
        <div className={styles.account}>
          <ProfileIcon type="secondary" />
          <NavLink
            to={isLoggedIn ? PATH_PROFILE_PAGE : PATH_LOGIN_PAGE}
            className={styles.link}
            style={({ isActive }) => ({
              color: isActive ? 'var(--text-primary-color)' : 'var(--text-inactive-color)',
            })}>
            Личный кабинет
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
