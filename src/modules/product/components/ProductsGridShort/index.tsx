import React, { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import { GetProductsWithImagesProps } from 'redux/types';
import ProductCard from 'modules/product/components/ProductCard';
import ProductsGridShortMobile from '../ProductsGridShortMobile';
import { useGetViewportWidth } from 'hooks';
import { ViewportWidth } from 'utils/constants';
import styles from './index.module.scss';

interface ProductsGridShortProps {
  searchProducts?: GetProductsWithImagesProps;
  title: string;
}

const mobileProducts = (searchProducts: GetProductsWithImagesProps) => {
  return searchProducts?.products?.map(
    ({ id, title, price, size, quantity, vendorCode }) => {
      const images =
        searchProducts?.images?.find(item => item.id === id)?.images ?? [];

      return (
        <SwiperSlide key={id} className={styles.swiperSlide}>
          <ProductCard
            productId={id}
            key={id}
            productName={title}
            price={price}
            sizes={size}
            image={images[0]?.url} // Added optional chaining here
            quantity={quantity}
            isMobile={true}
            vendorCode={vendorCode}
          />
        </SwiperSlide>
      );
    },
  );
};

const ProductsGridShort: FC<ProductsGridShortProps> = ({
  searchProducts = {} as GetProductsWithImagesProps,
  title,
}) => {
  const isMobile = useGetViewportWidth(ViewportWidth.TABLET);

  return searchProducts?.products?.length > 0 ? (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={isMobile ? styles.cardsWrapperMobile : styles.cardsWrapper}
      >
        {isMobile ? (
          <ProductsGridShortMobile>
            {mobileProducts(searchProducts)}
          </ProductsGridShortMobile>
        ) : (
          searchProducts?.products?.map(
            ({ id, title, price, size, quantity, vendorCode }) => {
              const images =
                searchProducts?.images?.find(item => item.id === id)?.images ??
                [];

              return (
                <ProductCard
                  key={id}
                  productId={id}
                  productName={title}
                  price={price}
                  sizes={size}
                  images={images}
                  quantity={quantity}
                  vendorCode={vendorCode}
                />
              );
            },
          )
        )}
      </div>
    </div>
  ) : null;
};

export default ProductsGridShort;
