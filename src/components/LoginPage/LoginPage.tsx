import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { LoginForm } from '../LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <h1 className={styles.loginPageTitle}>Увійти</h1>

      <LoginForm />

      <div className={styles.registerLinkBlock}>
        <span>Ще немає аккаунту?</span>
        <Link to={'/register'} className={styles.link}>Зареєструватися</Link>
      </div>
      
    </div>
);
}
