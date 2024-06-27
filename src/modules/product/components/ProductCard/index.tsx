import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ProductImageSwiper from 'modules/product/components/ProductImageSwiper';
import ProductInfo from 'modules/product/components/ProductInfo';
import { Size } from 'types/types';
import { ImageItemProps } from 'redux/types';
import styles from './index.module.scss';

export interface ProductCardProps {
  productId: string;
  productName: string;
  price?: string;
  sizes?: Size[];
  images?: ImageItemProps[];
  isMobile?: boolean;
  image?: string;
  quantity: number;
  vendorCode?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  productId,
  price,
  productName,
  sizes,
  images = [],
  isMobile,
  image,
  quantity,
  vendorCode,
}): JSX.Element => {
  const productPrice = price ? Number.parseFloat(price) : undefined;
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${productId}`}>
        <img src={image} alt={productName} className={styles.image} />
        {isMobile ? (
          <img src={image} alt={productName} className={styles.image} />
        ) : (
          <ProductImageSwiper images={images} />
        )}
      </Link>
      <ProductInfo
        productId={productId}
        productName={productName}
        price={productPrice}
        sizes={sizes}
        quantity={Number(quantity)}
        vendorCode={vendorCode}
      />
    </div>
  );
};

export default ProductCard;
