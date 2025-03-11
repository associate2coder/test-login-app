import { Link } from "react-router-dom";
import styles from './RegistrationPage.module.scss';
import { RegistrationForm } from "../RegistrationForm";

export const RegistrationPage: React.FC = () => {
  return (
    <div className={styles.registrationPage}>
      <h1 className={styles.registrationPageTitle}>Створити аккаунт</h1>

      <RegistrationForm />

      <div className={styles.loginLinkBlock}>
        <span>Вже є аккаунт?</span>
        <Link to={'/login'} className={styles.link}>Увійти</Link>
      </div>  
    </div>  
  );
}