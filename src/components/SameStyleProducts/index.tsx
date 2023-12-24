import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchProductsByParameterQuery } from 'redux/productsApi';
import ProductCardRequest from 'components/ProductCardRequest';
import styles from './index.module.scss';

interface SameStyleProductsProps {
  subcategory: string[];
}

const SameStyleProducts: FC<SameStyleProductsProps> = ({ subcategory }) => {
  const { t } = useTranslation();
  const { data } = useSearchProductsByParameterQuery({
    body: { subcategory },
    page: 1,
    size: 3,
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t('InSameStyle')}</p>
      <div className={styles.cardWrapper}>
        {data?.map(({ id }: { id: string }) => (
          <div className={styles.card} key={id}>
            <ProductCardRequest id={id} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SameStyleProducts;
