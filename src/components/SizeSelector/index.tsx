import React, { FC } from 'react';
import { Size } from 'types';
import styles from './index.module.scss';

export interface SizeSelectorProps {
  parameters: string[];
  sizes?: Size[];
  active: string | null;
  buttonStyles?: string;
  activeStyles?: string;
  handleClick: (param: string, value: string) => void;
}

const SizeSelector: FC<SizeSelectorProps> = ({
  parameters,
  sizes,
  active,
  buttonStyles,
  activeStyles,
  handleClick,
}) => {
  return (
    <>
      {parameters.map((parameter, index) => {
        return (
          <button
            key={index}
            className={`${buttonStyles || styles.parameterBtn} ${
              active === parameter ? activeStyles || styles.active : ''
            }`}
            onClick={() => handleClick('size', parameter)}
            disabled={sizes && !sizes.includes(parameter as Size)}
          >
            <p className={styles.text}>{parameter}</p>
          </button>
        );
      })}
    </>
  );
};

export default SizeSelector;
