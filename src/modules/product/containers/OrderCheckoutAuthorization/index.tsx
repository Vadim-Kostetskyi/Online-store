import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';
import LoginFacebookButton from 'modules/product/components/LoginFacebookButton';
import Input from 'modules/core/components/Input';
import styles from './index.module.scss';

const OrderCheckoutAuthorization = () => {
  const [stayLogged, setStayLogged] = useState(false);

  const { t } = useTranslation();

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

  const appleLogin = () => {
    //TODO add function to login with Apple
  };

  const facebookLogin = (response: IResolveParams) => {
    //TODO add function to login with Apple
    console.log(response);
  };

  const buttons = [
    { label: t('order.withoutRegistration'), className: '', onClick: () => {} },
    {
      label: t('order.continueWithApple'),
      className: 'appleText',
      onClick: () => appleLogin(),
    },
    {
      label: t('order.continueWithGoogle'),
      className: 'googleText',
      onClick: () => googleLogin(),
    },
  ];

  const handleChange = () => {
    setStayLogged(!stayLogged);
  };

  const FacebookButton = LoginFacebookButton(t('order.continueWithFacebook'));

  return (
    <div className={styles.wrapper}>
      <form className={styles.signForm}>
        <h1 className={styles.title}>{t('order.detailsTitle')}</h1>
        <Input
          placeholder={`${t('telephone')} / ${t('email')}`}
          wrapperClass={styles.inputWrapper}
          className={styles.input}
        />
        <Input
          type="password"
          placeholder={`${t('password')}`}
          wrapperClass={styles.inputWrapper}
          className={styles.input}
        />
        <div className={styles.helpOptions}>
          <label>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={stayLogged}
              onChange={handleChange}
            />
            <span className={styles.checkboxText}>
              {t('order.stayLoggedIn')}
            </span>
          </label>
          <a href="#" className={styles.forgotLink}>
            {t('order.forgotPassword')}
          </a>
        </div>
        <button className={styles.signBtn}>{t('order.signIn')}</button>
      </form>
      <span className={styles.text}>{t('order.orIfYouPrefer')}</span>
      {buttons.map(({ label, className, onClick }, index) => (
        <button
          key={label}
          className={index ? styles.socialSignBtn : styles.withoutRegisterBtn}
          onClick={onClick}
        >
          <span className={styles[className]}>{label}</span>
        </button>
      ))}
      <LoginSocialFacebook
        isOnlyGetToken
        appId={'440376498454130'}
        onResolve={response => facebookLogin(response)}
        onReject={error => {
          console.log(error);
        }}
      >
        <FacebookButton />
      </LoginSocialFacebook>
    </div>
  );
};

export default OrderCheckoutAuthorization;
