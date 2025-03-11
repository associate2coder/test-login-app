export const loginFormConfig = {
  email: {
    id: 'email',
    type: 'text',
    name: 'email',
    label: 'Email',
    required: true,
  },
  password: {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Пароль',
    required: true,
  }
}

export interface LoginFormData {
  email: string;
  emailError: string;
  emailFocus: boolean;
  password: string;
  passwordError: string;
  passwordFocus: boolean;
};

export const initialLoginState: LoginFormData = {
  email: '',
  emailError: '',
  emailFocus: false,
  password: '',
  passwordError: '',
  passwordFocus: false,
};