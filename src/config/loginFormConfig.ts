export const loginFormConfig = {
  email: {
    id: 'email',
    type: 'text',
    name: 'email',
    label: 'Email',
  },
  password: {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Пароль',
  }
}

export interface LoginFormData {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
};

export const initialLoginState: LoginFormData = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
};