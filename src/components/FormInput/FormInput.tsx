import React, { useCallback, useState } from 'react';
import { loginFormConfig } from '../../config/loginFormConfig';
import styles from './FormInput.module.scss';
import cn from 'classnames';
import showPass from '@assets/icons/showPass.svg';

interface Props {
  configKey: string;
  value: string;
  error: string;
  ref: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<Props> = React.memo(
  ({ 
    configKey,
    value,
    error,
    ref,
    onChange,
    onKeyDown, 
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const config = loginFormConfig[configKey as keyof typeof loginFormConfig];
    const isPassword = config.type === 'password';
    const applicableType = isPassword && showPassword ? 'text' : config.type;

    const togglePassword = useCallback(() => {
      setShowPassword(prevState => !prevState);
    }, [])

    return (
      <div className={styles.inputGroup}>
        <label htmlFor={config.id} className={styles.label}>{config.label}</label>

        <input 
          id={config.id}
          name={config.name}
          type={applicableType}
          value={value}
          ref={ref}
          className={cn(styles.textInput, {
            [styles.password]: isPassword,
            [styles.error]: error,
          })}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />

        {error && <p className={styles.errorMessage}>{error}</p>}

        {isPassword && (
          <img 
            src={showPass} 
            alt="eye icon" 
            className={styles.icon}
            onClick={togglePassword}
          />
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
