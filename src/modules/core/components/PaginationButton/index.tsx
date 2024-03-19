import React, { FC } from 'react';
import { getValidClassNames } from 'helpers';
import ArrowLeft from 'assets/svgs/ArrowLeft';
import ArrowRight from 'assets/svgs/ArrowRight';
import styles from './index.module.scss';

interface PaginationButtonProps {
  isPrevious?: boolean;
  isDisabled?: boolean;
  handleClick: () => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  isPrevious = false,
  isDisabled = false,
  handleClick,
}) => (
  <button
    className={getValidClassNames(styles.paginationButton, {
      [styles.paginationDisabled]: isDisabled,
    })}
    onClick={handleClick}
  >
    {isPrevious ? (
      <ArrowLeft isGrey={isDisabled} />
    ) : (
      <ArrowRight isGrey={isDisabled} />
    )}
  </button>
);

export default PaginationButton;
