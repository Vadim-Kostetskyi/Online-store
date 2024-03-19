import React, { useEffect, useState, useCallback } from 'react';
import ProductsGrid from 'modules/product/components/ProductsGrid';
import Loader from 'modules/core/components/Loader';
import {
  FIRST_PAGE,
  PRODUCT_GRID_SIZE,
  PRODUCT_GRID_SIZE_MOBILE,
} from 'utils/constants';
import { BodySearchProducts } from 'redux/types';
import { Category, Subcategory } from 'types/types';
import { useFetchProductsWithImagesMutation } from 'redux/productsApi';
import MainLayout from 'modules/core/components/MainLayout';
import FilterTabButtons from 'modules/product/components/FilterTabButtons';
import ProductsPagination from 'modules/product/components/ProductsPagination';
import { useTranslation } from 'react-i18next';
import { getButtons } from 'modules/product/components/FilterTabButtons/data';
import { useGetViewportWidth } from 'hooks';

const ProductsGridPage = (): JSX.Element => {
  const [searchProducts, { isLoading, data }] =
    useFetchProductsWithImagesMutation();

  const { t } = useTranslation();

  const [activeButton, setActiveButton] = useState<string>(
    getButtons(t)[0]?.value,
  );

  const [activePage, setActivePage] = useState<number>(FIRST_PAGE);

  const isMobile = useGetViewportWidth();
  const gridPageSize = isMobile ? PRODUCT_GRID_SIZE_MOBILE : PRODUCT_GRID_SIZE;

  useEffect(() => {
    searchProducts({
      page: FIRST_PAGE,
      size: gridPageSize,
      body: {
        category: Category.CLOTHING,
      },
    });
    setActivePage(FIRST_PAGE);
    setActiveButton(getButtons(t)[0]?.value);
  }, [isMobile]);

  const handleClick = useCallback((body: BodySearchProducts) => {
    searchProducts({
      page: FIRST_PAGE,
      size: gridPageSize,
      body,
    });
  }, []);

  const handlePagination = useCallback(
    (pageNumber: number) => {
      searchProducts({
        page: pageNumber,
        size: gridPageSize,
        body:
          activeButton === Category.CLOTHING || isMobile
            ? {
                category: activeButton as Category,
              }
            : {
                subcategory: activeButton as Subcategory,
              },
      });
    },
    [isMobile],
  );

  const pagesAmount = data?.pages ?? 0;

  return (
    <MainLayout isLoading={isLoading}>
      <FilterTabButtons
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setActivePage={setActivePage}
        handleClick={handleClick}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsGrid searchProducts={data} />
          {pagesAmount > 1 && (
            <ProductsPagination
              pagesAmount={pagesAmount}
              activePage={activePage}
              setActivePage={setActivePage}
              getPageProducts={handlePagination}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default ProductsGridPage;
