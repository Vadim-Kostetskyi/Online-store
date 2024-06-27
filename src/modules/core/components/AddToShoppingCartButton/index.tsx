import React, { FC } from 'react';
import ShoppingBag from 'assets/svgs/ShoppingBag';
import styles from './insex.module.scss';

interface AddToShoppingCartButtonProps {
  onClick: () => void;
  quantity?: number;
  isDisabled?: boolean;
}

const AddToShoppingCartButton: FC<AddToShoppingCartButtonProps> = ({
  onClick,
  quantity,
  isDisabled,
}) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={isDisabled}>
      <ShoppingBag className={styles.shoppingBagIcon} />
      {quantity && quantity > 0 ? (
        <div className={styles.quantity}>{quantity}</div>
      ) : null}
    </button>
  );
};

export default AddToShoppingCartButton;
