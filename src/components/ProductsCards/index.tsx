import React, { FC } from 'react';
import ProductCard from 'components/ProductCard';
import { GetProductsWithImagesProps } from 'redux/types';
import styles from './index.module.scss';

interface ProductsCardsProps {
  searchProducts: GetProductsWithImagesProps;
}

const ProductsCards: FC<ProductsCardsProps> = ({ searchProducts }) => (
  <div className={styles.cardsWrapper}>
    {searchProducts?.products?.map(({ id, title, price, size }) => {
      const images =
        searchProducts?.images?.find(item => item.id === id)?.images ?? [];
      return (
        <ProductCard
          key={id}
          productId={id}
          productName={title}
          price={price}
          sizes={size}
          images={images}
        />
      );
    })}
  </div>
);

export default ProductsCards;
