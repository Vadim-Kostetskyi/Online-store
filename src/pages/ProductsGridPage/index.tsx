import React, { useCallback, useEffect } from 'react';
import ProductsGrid from 'modules/product/components/ProductsGrid';
import Loader from 'modules/core/components/Loader';
import { FIRST_PAGE, PRODUCT_GRID_SIZE } from 'utils/constants';
import { BodyFilterProducts, BodySearchProducts } from 'redux/types';
import { Category } from 'types/types';
import { useFetchProductsWithImagesMutation } from 'redux/productsApi';
import MainLayout from 'modules/core/components/MainLayout';
import FilterTabButtons from 'modules/product/components/FilterTabButtons';
import ProductFilter from 'modules/product/components/ProductFilter';
import styles from './index.module.scss';

const ProductsGridPage = (): JSX.Element => {
  const [searchProducts, { isLoading, data }] =
    useFetchProductsWithImagesMutation();

  useEffect(() => {
    searchProducts({
      page: FIRST_PAGE,
      size: PRODUCT_GRID_SIZE,
      body: {
        category: Category.CLOTHING,
      },
    });
  }, []);

  const handleClick = (body: BodySearchProducts) => {
    searchProducts({
      page: FIRST_PAGE,
      size: PRODUCT_GRID_SIZE,
      body,
    });
  };

  const handleClickFilter = useCallback(
    (body: BodyFilterProducts, sortBy: string) => {
      searchProducts({
        isFilter: true,
        page: 1,
        size: PRODUCT_GRID_SIZE,
        body,
        sortBy,
      });
    },
    [],
  );

  const handleSetNewNowProducts = useCallback(() => {
    searchProducts({
      page: 1,
      size: PRODUCT_GRID_SIZE,
      isNewNow: true,
    });
  }, []);

  return (
    <MainLayout>
      <FilterTabButtons handleClick={handleClick} />
      <div className={styles.filterWrapper}>
        {/* TODO fixed overlapping elements */}
        <ProductFilter
          handleClick={handleClickFilter}
          setNewProducts={handleSetNewNowProducts}
        />
      </div>
      {isLoading ? <Loader /> : <ProductsGrid searchProducts={data} />}
    </MainLayout>
  );
};

export default ProductsGridPage;
