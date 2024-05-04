import React from 'react';
import { useTranslation } from 'react-i18next';
import Visa from 'assets/images/payment/visa.png';
import Mastercard from 'assets/images/payment/mastercard.png';
import AmericanExpress from 'assets/images/payment/american-express.png';
import Discover from 'assets/images/payment/discover.png';
import GooglePay from 'assets/images/payment/google-pay.png';
import Paypal from 'assets/images/payment/paypal.png';
import ApplePay from 'assets/images/payment/apple-pay.png';
import styles from './index.module.scss';

const Payment = () => {
  const { t } = useTranslation();
  const paymentChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    //TODO add the function of choosing a payment method
    console.log(e.currentTarget.name);
  };

  return (
    <div className={styles.paymentWrapper}>
      <div className={styles.paymentButtons}>
        <button
          className={styles.paymentMethod}
          name="Visa"
          onClick={paymentChoice}
        >
          {t('order.creditCard')}
          <div className={styles.cardImageWrapper}>
            <img src={Visa} alt="Visa image" />
            <img src={Mastercard} alt="Mastercard image" />
            <img src={AmericanExpress} alt="AmericanExpress image" />
            <img src={Discover} alt="Discover image" />
          </div>
        </button>
        <button
          className={styles.paymentMethod}
          name="GooglePay"
          onClick={paymentChoice}
        >
          {t('order.googlePay')}
          <img src={GooglePay} alt="GooglePay image" />
        </button>
        <button
          className={styles.paymentMethod}
          name="Paypal"
          onClick={paymentChoice}
        >
          {t('order.paypal')}
          <img src={Paypal} alt="Paypal image" />
        </button>
        <button
          className={styles.paymentMethod}
          name="ApplePay"
          onClick={paymentChoice}
        >
          {t('order.applePay')}
          <img src={ApplePay} alt="ApplePay image" />
        </button>
      </div>
      <p className={styles.policy}>{t('order.policy')}</p>
    </div>
  );
};

export default Payment;
