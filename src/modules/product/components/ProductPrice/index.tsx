import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getTotalPrice, getValidClassNames } from 'helpers';
import styles from './index.module.scss';

interface ProductPriceProps {
  count?: number;
  price: number;
  className?: string;
}

const ProductPrice: FC<ProductPriceProps> = ({
  count = 1,
  price,
  className,
}): JSX.Element => {
  const { t } = useTranslation();
  const totalPrice = getTotalPrice(count, price);

  return (
    <div className={getValidClassNames(styles.productPrice, className)}>
      <p>
        {totalPrice} <span>{t('currency')}</span>
      </p>
    </div>
  );
};

export default ProductPrice;
