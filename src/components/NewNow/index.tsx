import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from 'components/ProductCard';
import NewNowMobile from 'components/NewNowMobile';
import styles from './index.module.scss';

import { useGetNewNowProductsQuery } from 'redux/productsApi';
import { GetProductsWithImagesDTO } from 'redux/types';
import { SwiperSlide } from 'swiper/react';

const renderCards = (
  data?: GetProductsWithImagesDTO[],
  isMobile?: boolean,
): JSX.Element => {
  return (
    <>
      {data?.map(({ product, images }) => {
        const { id, title, price, size } = product;

        return isMobile ? (
          <SwiperSlide key={id} className={styles.swiperSlide}>
            <ProductCard
              productId={id}
              key={id}
              productName={title}
              price={price}
              sizes={size}
              image={images[0].url}
              isMobile
            />
          </SwiperSlide>
        ) : (
          <ProductCard
            productId={id}
            key={id}
            productName={title}
            price={price}
            sizes={size}
            images={images}
          />
        );
      })}
    </>
  );
};

const NewNow = (): JSX.Element => {
  const { t } = useTranslation();
  const { data } = useGetNewNowProductsQuery();
  const renderCardsMemoized = useMemo(() => renderCards(data), [data]);
  const renderCardsMemoizedMobile: JSX.Element = useMemo(
    () => renderCards(data, true),
    [data],
  );

  return (
    <div className={styles.newNow}>
      <div className={styles.newNowBox}>
        <h1 className={styles.title}>{t('newNow')}</h1>
        <div className={styles.cardBox}>{renderCardsMemoized}</div>
        <div className={styles.cardBoxMobile}>
          <NewNowMobile cards={renderCardsMemoizedMobile} />
        </div>
      </div>
    </div>
  );
};

export default NewNow;
