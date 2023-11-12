import React, { FC } from 'react';
import ImageSwiper from './ImageSwiper';
import Info from './Info';
import styles1 from './index.module.scss';

export interface ProductCardProps {
  productName: string;
  price: string;
  sizes: string[];
  images: string[];
}

const ProductCard: FC<ProductCardProps> = ({
  price,
  productName,
  sizes,
  images,
}) => {
  const imageProps = {
    images,
    productName,
  };

  const infoProps = {
    productName,
    price,
    sizes,
  };

  return (
    <div className={styles1.mainBox}>
      <ImageSwiper {...imageProps} />
      <Info {...infoProps} />
    </div>
  );
};

export default ProductCard;
