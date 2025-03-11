import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './LoginForm.module.scss';
import { initialLoginState, loginFormConfig, LoginFormData } from './loginFormConfig'
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';
import { EMAIL_REGEXP, INVALID_EMAIL_FORMAT_ERROR, MIN_PASSWORD_ERROR, MIN_PASSWORD_LENGTH, REQUIRED_FIELD_ERROR } from '../../config/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setEmail } from '../../store/userSlice';
import { Modal } from '../Modal/Modal';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState(initialLoginState);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector(state => state.user);

  const updateFormData = (updatedFields: Partial<LoginFormData>) => {
    setFormData(prevState => {
      return {
        ...prevState,
        ...updatedFields,
      }
    })
  }

  // email validation
  const validateEmail = useCallback(() => {
    const email = formData.email;

    if (!email) {
      updateFormData({ emailError: REQUIRED_FIELD_ERROR});

      return REQUIRED_FIELD_ERROR;
    }

    if (!EMAIL_REGEXP.test(email)) {
      updateFormData({ emailError: INVALID_EMAIL_FORMAT_ERROR});

      return INVALID_EMAIL_FORMAT_ERROR;
    }

    updateFormData({
      emailError: '',
    });

    return '';
  }, [formData.email]);

  // password validation
  const validatePassword = useCallback(() => {
    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      updateFormData({ passwordError: MIN_PASSWORD_ERROR});

      return MIN_PASSWORD_ERROR;
    }

    return '';
  }, [formData.password]);

  // focus email input on first load
  useEffect(() => {
    const emailInput = emailRef.current;

    if (!emailInput) {
      return;
    }

    emailInput.focus();
  }, [])

  // handle pressing Enter key on email input
  const handleEnterOnEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    } else {
      e.preventDefault();
    }

    const target = e.target as HTMLInputElement;

    if (target && target.name === loginFormConfig.email.name) {

      if (validateEmail()) {
        return;
      }

      const passwordInput = passwordRef.current;

      if (passwordInput) {
        passwordInput.focus();
      }
    }
  }

  // handle submitting the form
  const handleFormSubmit = (e: React.FormEvent) => {
    console.log('submit');
    
    e.preventDefault();

    const errors = {
      emailError: '',
      passwordError: '',
    }

    errors.emailError = validateEmail();
    errors.passwordError = validatePassword();

    if (!errors.emailError && !errors.passwordError) {
      // if no errors, form data is sent
      // in this particular case, email is sent to the store
      dispatch(setEmail(formData.email));
      // form is cleared
      setFormData(initialLoginState);
      // modal is shown
      setShowModal(true);
    } else {
      // existing errors are saved to the state
      updateFormData({ 
        emailError: errors.emailError,
        passwordError: errors.passwordError,
      });
    }
  }

  // handle submit button click
  const triggerSubmit = () => {
    const form = formRef.current;

    if (form) {
      form.submit();
    }
  }

  // handle change of email/password inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    if (target) {
      setFormData(prevState => {
        return {
          ...prevState,
          [target.name]: target.value.trim(),
          [`${target.name}Error`]: '',
        }
      });
    }
  }

  return (
    <>
      <form action="submit" className={styles.form} onSubmit={handleFormSubmit} >
        <FormInput
          configKey="email"
          value={formData.email}
          error={formData.emailError}
          ref={emailRef}
          onChange={handleChange}
          onKeyDown={handleEnterOnEmail}
        />
        <FormInput
          configKey="password"
          value={formData.password}
          error={formData.passwordError}
          ref={passwordRef}
          onChange={handleChange}
        />
        <Button text="Увійти" onClick={triggerSubmit} />
      </form>

      {showModal && (
        <Modal overlay={true}>
          <div className={styles.successMessage}>
            <p>{`Дякуємо, ${user.currentEmail}! Ваша авторизація успішна`}</p>
            
            <Button text='OK' onClick={() => setShowModal(false)} />
          </div>
        </Modal>
      )}

      
    </>
  );
}