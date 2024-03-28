import styles from './page-404.module.css';
import page404 from '../../images/404.jpg';

const Page404 = () => {
  return <img className={styles.image} src={page404} alt="Страница не найдена" />;
};

export default Page404;
