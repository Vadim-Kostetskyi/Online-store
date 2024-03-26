import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getTotalPrice, getValidClassNames } from 'helpers';
import Info from 'assets/svgs/Info';
import styles from './index.module.scss';

type OrderSummaryProps = {
  totalPrice: number;
  isOrder?: boolean;
  amountProducts?: number;
};

const OrderSummary: FC<OrderSummaryProps> = ({
  totalPrice,
  isOrder,
  amountProducts,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={isOrder ? styles.orderContainer : styles.container}>
      <div className={styles.deliveryInfo}>
        <Info className={styles.infoIcon} />
        <p className={getValidClassNames(styles.text, styles.white)}>
          {t('shoppingCart.deliveryInfo')}
        </p>
      </div>
      <div className={isOrder ? '' : styles.orderSummaryContainer}>
        {isOrder ? (
          <div className={styles.itemsBox}>
            <p>
              {amountProducts === 1
                ? `${amountProducts} item`
                : `${amountProducts} items`}
            </p>
            <p className={styles.black}>
              {getTotalPrice(1, totalPrice) + ' '}
              <span className={styles.currency}>{t('currency')}</span>
            </p>
          </div>
        ) : null}
        <div
          className={getValidClassNames(
            styles.totalPrice,
            styles.text,
            styles.bold,
          )}
        >
          <p className={styles.black}>
            {t('shoppingCart.total').toUpperCase()}
          </p>
          <p className={styles.black}>
            {getTotalPrice(1, totalPrice) + ' '}
            <span className={styles.currency}>{t('currency')}</span>
          </p>
        </div>
        {isOrder ? null : (
          <div className={styles.processOrderButton}>
            <button
              className={getValidClassNames(
                styles.text,
                styles.white,
                styles.title,
              )}
            >
              {t('shoppingCart.processOrderButton').toUpperCase()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
