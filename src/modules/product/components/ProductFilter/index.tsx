import React, { FC, useCallback, useState } from 'react';
import ProductFilterPanel from '../ProductFilterPanel';
import burgerMenu from 'assets/svgs/MenuFilter.svg';
import { BodyFilterProducts, GetProductsWithImages } from 'redux/types';
import styles from './index.module.scss';

interface ProductFilterProps {
  handleClick: (body: BodyFilterProducts, sortBy: string) => void;
  setNewProducts: (data?: GetProductsWithImages[]) => void;
}

const ProductFilter: FC<ProductFilterProps> = ({
  handleClick,
  setNewProducts,
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = useCallback(() => {
    setIsFilterVisible(!isFilterVisible);
  }, [isFilterVisible]);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={toggleFilterVisibility}
        className={isFilterVisible ? styles.invisible : styles.burgerMenuButton}
      >
        <img className={styles.burgerMenuIcon} src={burgerMenu} alt="" />
      </button>
      <div className={styles.filterWrapper}>
        <div className={isFilterVisible ? styles.filterBox : styles.hide}>
          <ProductFilterPanel
            handleClose={toggleFilterVisibility}
            handleClick={handleClick}
            handleSetNewProducts={setNewProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
