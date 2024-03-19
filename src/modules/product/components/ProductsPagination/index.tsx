import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_PAGES_AMOUNT } from 'utils/constants';
import { createPagesList } from 'helpers/create-pages-list.helper';
import PaginationButton from 'modules/core/components/PaginationButton';
import Ellipsis from 'modules/core/components/Ellipsis';
import PageLink from 'modules/core/components/PageLink';

import styles from './index.module.scss';

export interface ProductsPaginationProps {
  pagesAmount: number;
  activePage: number;
  setActivePage: (activePage: number) => void;
  getPageProducts: (pageNumber: number) => void;
}

const ProductsPagination: FC<ProductsPaginationProps> = ({
  pagesAmount,
  activePage,
  setActivePage,
  getPageProducts,
}) => {
  const { t } = useTranslation();

  const pagesList = useMemo(() => createPagesList(pagesAmount), [pagesAmount]);

  const handleNumberClick = useCallback(
    (pageNumber: number) => () => {
      getPageProducts(pageNumber);
      setActivePage(pageNumber);
    },
    [activePage],
  );

  const handleButtonClick = useCallback(
    (increment: number) => () => {
      const nextPage = activePage + increment;
      getPageProducts(nextPage);
      setActivePage(nextPage);
    },
    [activePage],
  );

  return (
    <div className={styles.pagination}>
      <PaginationButton
        isPrevious
        isDisabled={activePage === 1}
        handleClick={handleButtonClick(-1)}
      />
      <ul className={styles.pager}>
        <li className={styles.pageText}>{t('page')}</li>
        {pagesAmount <= DEFAULT_PAGES_AMOUNT ? (
          pagesList.map(pageNumber => (
            <PageLink
              key={pageNumber}
              pageNumber={pageNumber}
              activePage={activePage}
              handleClick={handleNumberClick(pageNumber)}
            />
          ))
        ) : (
          <>
            <PageLink
              key={1}
              pageNumber={1}
              activePage={activePage}
              handleClick={handleNumberClick(1)}
            />
            {activePage <= 3 &&
              [2, 3].map(pageNumber => (
                <PageLink
                  key={pageNumber}
                  pageNumber={pageNumber}
                  activePage={activePage}
                  handleClick={handleNumberClick(pageNumber)}
                />
              ))}
            {activePage === 3 && (
              <PageLink
                key={4}
                pageNumber={4}
                activePage={activePage}
                handleClick={handleNumberClick(4)}
              />
            )}
            <Ellipsis key={'ellipsis1'} />
            {activePage >= 4 && activePage <= pagesAmount - 3 && (
              <>
                {[activePage - 1, activePage, activePage + 1].map(
                  pageNumber => (
                    <PageLink
                      key={pageNumber}
                      pageNumber={pageNumber}
                      activePage={activePage}
                      handleClick={handleNumberClick(pageNumber)}
                    />
                  ),
                )}
                <Ellipsis key={'ellipsis1'} />
              </>
            )}
            {activePage === pagesAmount - 2 && (
              <PageLink
                key={pagesAmount - 3}
                pageNumber={pagesAmount - 3}
                activePage={activePage}
                handleClick={handleNumberClick(pagesAmount - 3)}
              />
            )}
            {activePage > pagesAmount - 3 &&
              [pagesAmount - 2, pagesAmount - 1].map(pageNumber => (
                <PageLink
                  key={pageNumber}
                  pageNumber={pageNumber}
                  activePage={activePage}
                  handleClick={handleNumberClick(pageNumber)}
                />
              ))}
            <PageLink
              key={pagesAmount}
              pageNumber={pagesAmount}
              activePage={activePage}
              handleClick={handleNumberClick(pagesAmount)}
            />
          </>
        )}
      </ul>
      <PaginationButton
        isDisabled={activePage === pagesAmount}
        handleClick={handleButtonClick(1)}
      />
    </div>
  );
};

export default ProductsPagination;
