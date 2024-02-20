import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterOptions from '../FilterOptions';
import Cross from 'assets/svgs/Cross';
import { Color, FilterItems, Size } from 'types/types';
import { BodyFilterProducts } from 'redux/types';
import styles from './index.module.scss';

interface ProductFilterPanelProps {
  handleClose: () => void;
  handleClick: (body: BodyFilterProducts, sortBy: string) => void;
  handleSetNewProducts: () => void;
}

const ProductFilterPanel: FC<ProductFilterPanelProps> = ({
  handleClose,
  handleClick,
  handleSetNewProducts,
}) => {
  const [size, setSize] = useState<Size[]>([]);
  const [color, setColor] = useState<Color[]>([]);
  const [tab, setTab] = useState<string>(FilterItems.PriceLowToHighRequest);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [isClearActive, setIsClearActive] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (
      size.length > 0 ||
      color.length > 0 ||
      priceRange[0] > 0 ||
      priceRange[1] < 1000
    ) {
      setIsClearActive(false);
    }
  }, [size, color, priceRange]);

  useEffect(() => {
    if (isClearActive) {
      setColor([]);
      setSize([]);
      setTab('');
      setPriceRange([0, 1000]);
    }
  }, [isClearActive]);

  const requestColor = useMemo(
    () => color.map(col => col.toUpperCase()),
    [color],
  );

  const handleFilter = useCallback(() => {
    handleClick(
      {
        colours: requestColor,
        sizes: size,
        priceRange: {
          min: priceRange[0],
          max: priceRange[1],
        },
      },
      tab,
    );
  }, [priceRange, requestColor, size]);

  const props = {
    setSize,
    setColor,
    setTab,
    setPriceRange,
    sortProducts: handleClick,
    handleSetNewProducts,
    isResetting: isClearActive,
  };

  const handleClearFilter = () => {
    setIsClearActive(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{t('productFilter.filter')}</p>
        <button className={styles.crossBtn} onClick={handleClose}>
          <Cross className={styles.cross} />
        </button>
      </div>
      <FilterOptions {...props} />
      <div className={styles.buttonsWrapper}>
        <button
          className={
            isClearActive ? styles.buttonClear : styles.buttonClearActive
          }
          onClick={handleClearFilter}
          disabled={isClearActive}
        >
          {t('productFilter.clear')}
        </button>
        <button className={styles.buttonResults} onClick={handleFilter}>
          {t('productFilter.seeResults')}
        </button>
      </div>
    </div>
  );
};

export default ProductFilterPanel;
