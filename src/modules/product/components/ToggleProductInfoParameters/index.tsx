import React, { FC, useCallback, useMemo } from 'react';
import Cross from 'assets/svgs/Cross';
import { Color, Size } from 'types/types';
import SizeSelector from 'modules/product/components/SizeSelector';
import styles from './index.module.scss';
import { clsx } from 'clsx';

interface ToggleProductInfoParameters {
  text: string;
  open: boolean[];
  parameters: string[];
  index: number;
  sizes?: Size[];
  active?: Size | Color;
  productInfo: string;
  toggle: (element: number) => void;
  handleClick: (size: Size | Color) => void;
}

const ToggleProductInfoParameters: FC<ToggleProductInfoParameters> = ({
  open,
  parameters,
  toggle,
  text,
  handleClick,
  active,
  index,
  sizes,
  productInfo,
}) => {
  const parametersClassName = clsx(styles.parametersBtn, {
    [styles.hide]: open[index],
  });

  const getCombinedClass = useCallback(
    (parameter: string) =>
      clsx(styles.parameterColorBtn, { [styles.active]: active === parameter }),
    [active],
  );

  const parameterBoxClassName = useMemo(
    () => clsx(styles.parameterBox, { [styles.hide]: !open[index] }),
    [open[index]],
  );

  const handleOpenCloseParameters = useCallback(() => toggle(index), []);

  return (
    <div className={styles.toggleParameter}>
      <button
        onClick={handleOpenCloseParameters}
        className={parametersClassName}
      >
        {text}
      </button>
      <div className={parameterBoxClassName}>
        <div className={styles.parametersBtn}>
          {productInfo === 'color' ? (
            parameters.map((parameter, index) => (
              <button
                key={index}
                className={getCombinedClass(parameter)}
                onClick={() => handleClick(parameter as Color)}
              >
                <span
                  className={
                    parameter === 'Black'
                      ? styles.blackColor
                      : styles.whiteColor
                  }
                ></span>
              </button>
            ))
          ) : (
            <SizeSelector
              sizes={sizes}
              active={active as Size}
              handleClick={handleClick as (size: Size) => void}
            />
          )}
        </div>
        <button className={styles.crossBtn} onClick={handleOpenCloseParameters}>
          <Cross className={styles.crossImg} />
        </button>
      </div>
    </div>
  );
};

export default ToggleProductInfoParameters;
