import { createButton } from 'react-social-login-buttons';
import styles from './index.module.scss';

const config = (text: string) => ({
  text,
  style: {
    boxShadow: 'none',
    margin: 'none',
    width: '100%',
    color: '#212121',
    fontSize: 16,
    fontWeight: 500,
  },
  iconSize: 0,
  align: 'center',
  className: styles.button,
});

const LoginFacebookButton = (text: string) => createButton(config(text));

export default LoginFacebookButton;
