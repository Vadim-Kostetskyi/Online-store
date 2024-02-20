import React, { FC, useCallback } from 'react';
import { clsx } from 'clsx';
import { Size } from 'types/types';
import styles from './index.module.scss';

const defaultSizes: Size[] = Object.values(Size);

export interface SizeSelectorProps {
  sizes?: Size[];
  active?: Size | Size[];
  handleClick: (size: Size) => void;
  isProductDetails?: boolean;
  isFilter?: boolean;
}

const SizeSelector: FC<SizeSelectorProps> = ({
  sizes,
  active,
  handleClick,
  isProductDetails,
  isFilter,
}) => {
  const isActiveStyles = isProductDetails
    ? styles.activeProductDetails
    : styles.active;

  const combinedClassName = useCallback(
    (parameter: Size) =>
      clsx(
        isProductDetails
          ? styles.productDetailsParameterBtn
          : isFilter
          ? styles.parameterBtnFilter
          : styles.parameterBtn,
        active === parameter ? isActiveStyles : '',
        typeof active != 'string' && active?.includes(parameter)
          ? styles.activeProductDetails
          : '',
      ),
    [active],
  );

  return (
    <>
      {defaultSizes.map((size, index) => (
        <button
          key={index}
          className={combinedClassName(size)}
          onClick={() => handleClick(size)}
          disabled={sizes && !sizes.includes(size)}
        >
          <p className={styles.text}>{size}</p>
        </button>
      ))}
    </>
  );
};

export default SizeSelector;
