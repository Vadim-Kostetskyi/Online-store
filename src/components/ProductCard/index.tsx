import React, { FC } from 'react';
import ProductImageSwiper from 'components/ProductImageSwiper';
import ProductInfo from 'components/ProductInfo';
import { Size } from 'types';
import styles from './index.module.scss';
import { ImageItemProps } from 'redux/types';
import { Link } from 'react-router-dom';

export interface ProductCardProps {
  id?: string;
  title: string;
  price: string;
  size: Size[];
  files?: ImageItemProps[];
  isMobile?: boolean;
  image?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  price,
  title,
  size,
  files = [],
  isMobile,
  image,
}) => (
  <div className={styles.productCard}>
    {isMobile ? (
      <img src={image} alt={title} className={styles.image} />
    ) : (
      <Link to={`/product-order/${id}`}>
        <ProductImageSwiper images={files} />
      </Link>
    )}
    <ProductInfo productName={title} price={price} sizes={size} />
  </div>
);

export default ProductCard;
