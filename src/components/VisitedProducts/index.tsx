import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCardRequest from 'components/ProductCardRequest';
import styles from './index.module.scss';

const VisitedProducts = () => {
  const { t } = useTranslation();
  const { productId } = useParams();

  const visitedProduct = localStorage.getItem('visited');
  const visitedProductArray = visitedProduct ? JSON.parse(visitedProduct) : [];
  console.log(visitedProductArray);

  const filteredVisitedProductArray = visitedProductArray
    ?.filter((item: string) => item !== productId)
    .slice(0, 3);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t('YouAlsoViewed')}</p>
      <div className={styles.cardWrapper}>
        {filteredVisitedProductArray.map((id: string) => (
          <div className={styles.card} key={id}>
            <ProductCardRequest id={id} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default VisitedProducts;
