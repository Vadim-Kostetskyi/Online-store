import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useClearCartEffect } from 'hooks';
import { selectTotalQuantity } from 'redux/slices/shopping-cart';
import User from 'assets/svgs/User';
import Search from 'assets/svgs/Search';
import ShoppingCartModal from 'modules/checkout/containers/ShoppingCartModal';
import AddToShoppingCartButton from 'modules/core/components/AddToShoppingCartButton';
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
      <div className={styles.userButtons}>
        <button className={styles.userButton}>
          <User className={styles.userIcon} />
        </button>
        <AddToShoppingCartButton onClick={openModal} quantity={quantity} />
        {isModalOpen && <ShoppingCartModal onClose={closeModal} />}
      </div>
    </>
  );
};

export default TopBar;
