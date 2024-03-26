import React, { FC } from 'react';
import IconButton from 'modules/core/components/IconButton';
import Cross from 'assets/svgs/Cross';
import styles from './index.module.scss';

type ShoppingCartHeaderProps = {
  title: string;
  onClose: () => void;
  isOrder?: boolean;
};

const ShoppingCartHeader: FC<ShoppingCartHeaderProps> = ({
  onClose,
  title,
  isOrder,
}): JSX.Element => (
  <div className={styles.header}>
    <h2 className={styles.title}>{title}</h2>
    {isOrder ? null : (
      <IconButton className={styles.closeButton} onClick={onClose}>
        <Cross />
      </IconButton>
    )}
  </div>
);

export default ShoppingCartHeader;
