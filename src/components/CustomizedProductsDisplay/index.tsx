import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useFetchProductsWithImagesMutation,
  useGetProductsByIdWithImagesQuery,
} from 'redux/productsApi';
import { BodySearchProducts } from 'redux/types';
import { FIRST_PAGE, SIMILAR_PRODUCTS_SIZE } from 'utils/constants';
import ProductsGridShort from 'modules/product/components/ProductsGridShort';
import { useLocalStorage } from 'hooks';
import styles from './index.module.scss';

const CustomizedProductsDisplay: FC<BodySearchProducts> = ({ subcategory }) => {
  const [visitedProducts, setVisitedProducts] = useState<string[]>([]);
  const [searchProducts, { data }] = useFetchProductsWithImagesMutation();

  const visitedProductsData = useGetProductsByIdWithImagesQuery({
    id: visitedProducts,
  });

  const { productId } = useParams();

  useEffect(() => {
    const { getItem } = useLocalStorage<string[]>('visited', []);
    const visitedProduct = getItem();

    const visitedProductArray =
      visitedProduct
        ?.filter((item: string) => item !== productId)
        ?.slice(0, 3) ?? [];

    setVisitedProducts(visitedProductArray);
  }, [productId]);

  const { t } = useTranslation();

  useEffect(() => {
    searchProducts({
      page: FIRST_PAGE,
      size: SIMILAR_PRODUCTS_SIZE,
      body: {
        subcategory,
      },
    });
  }, [subcategory]);

  return (
    <div className={styles.wrapper}>
      <ProductsGridShort searchProducts={data} title={t('similarProducts')} />
      <ProductsGridShort
        searchProducts={visitedProductsData.data}
        title={t('viewedProducts')}
      />
    </div>
  );
};
export default CustomizedProductsDisplay;
