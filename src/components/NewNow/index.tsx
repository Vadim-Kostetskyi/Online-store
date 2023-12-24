import React from 'react';
import { useTranslation } from 'react-i18next';
// TODO: load pics from backend
import img1 from 'assets/images/product/man-gallery-1.png';
import img2 from 'assets/images/product/man-gallery-2.png';
import img3 from 'assets/images/product/man-gallery-3.png';
import img4 from 'assets/images/product/man-gallery-4.png';
import img5 from 'assets/images/product/man-gallery-5.png';
import img6 from 'assets/images/product/man-gallery-6.png';
import img7 from 'assets/images/product/man-gallery-7.png';
import ProductCard from 'components/ProductCard';
import { Size } from 'types';
import NewNowMobile from 'components/NewNowMobile';
import styles from './index.module.scss';

export interface CardProps {
  productName: string;
  price: string;
  sizes: Size[];
  images: string[];
}

const NewNow = (): JSX.Element => {
  const { t } = useTranslation();

  // TODO: load info from backend
  const cards: CardProps[] = [
    {
      productName: 'Shearling denim jacket',
      price: '119.99 €',
      sizes: [Size.XS, Size.S, Size.XL],
      images: [img1, img2, img3, img4, img5, img6, img7],
    },
    {
      productName: 'Ribbed wool-blend sweater',
      price: '89 €',
      sizes: [Size.XS, Size.M, Size.L],
      images: [img3, img4, img5],
    },
    {
      productName: '100% cotton bomber jacket',
      price: '54.59 €',
      sizes: [Size.S, Size.M, Size.XL],
      images: [img2, img7],
    },
  ];

  return (
    <div className={styles.newNow}>
      <div className={styles.newNowBox}>
        <h1 className={styles.title}>{t('newNow')}</h1>
        <div className={styles.cardBox}>
          {cards.map(({ productName, price, sizes }, index) => (
            <ProductCard
              key={index}
              title={productName}
              price={price}
              size={sizes}
              // TODO: fix this
              files={[]}
              // images={images}
            />
          ))}
        </div>
        <div className={styles.cardBoxMobile}>
          <NewNowMobile cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default NewNow;
