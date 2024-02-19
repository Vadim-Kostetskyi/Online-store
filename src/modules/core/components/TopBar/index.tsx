import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useClearCartEffect } from 'hooks';
import { selectTotalQuantity } from 'redux/slices/shopping-cart';
import ShoppingBag from 'assets/svgs/ShoppingBag';
import User from 'assets/svgs/User';
import Search from 'assets/svgs/Search';
import ShoppingCartModal from 'modules/checkout/containers/ShoppingCartModal';
import styles from './index.module.scss';

const TopBar = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const quantity = useAppSelector(selectTotalQuantity);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useClearCartEffect(quantity);

  return (
    <>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={t('searchPlaceholder')}
        />
        <button className={styles.searchButton}>
          <Search className={styles.searchIcon} />
        </button>
      </div>
      <button className={styles.userButton}>
        <User className={styles.userIcon} />
      </button>
      <button className={styles.shoppingCartButton} onClick={openModal}>
        <ShoppingBag className={styles.shoppingBagIcon} />
        {quantity > 0 ? (
          <div className={styles.quantity}>{quantity}</div>
        ) : null}
      </button>
      {isModalOpen && <ShoppingCartModal onClose={closeModal} />}
    </>
  );
};

export default TopBar;
