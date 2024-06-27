import React, { FC, useCallback } from 'react';
import { Size } from 'types/types';
import { getValidClassNames } from 'helpers';
import styles from './index.module.scss';

export interface SizeSelectorProps {
  parameters?: Size[];
  sizes?: Size[];
  active?: Size | Size[];
  handleClick: (size: Size) => void;
  isProductDetails?: boolean;
  isFilter?: boolean;
}

const SizeSelector: FC<SizeSelectorProps> = ({
  parameters,
  sizes,
  active,
  handleClick,
  isProductDetails,
  isFilter,
}): JSX.Element => {
  const displaySizes = parameters || sizes;

  const isActiveStyles = isProductDetails
    ? styles.activeProductDetails
    : styles.active;

  const combinedClassName = useCallback(
    (parameter: Size) =>
      getValidClassNames(
        isProductDetails
          ? styles.productDetailsParameterBtn
          : isFilter
          ? styles.parameterBtnFilter
          : styles.parameterBtn,
        { [isActiveStyles]: active === parameter },
        Array.isArray(active) && active?.includes(parameter)
          ? styles.activeProductDetails
          : '',
      ),
    [active, isActiveStyles, isProductDetails],
  );

  return (
    <div
      className={
        isProductDetails ? styles.btnBlockProductDetails : styles.btnBlock
      }
    >
      {displaySizes &&
        displaySizes.map((size, index) => (
          <button
            key={index}
            className={combinedClassName(size)}
            onClick={() => handleClick(size)}
            disabled={sizes && !sizes.includes(size)}
          >
            <p className={styles.text}>{size}</p>
          </button>
        ))}
    </div>
  );
};

export default SizeSelector;
