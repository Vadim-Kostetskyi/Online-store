import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from 'modules/core/components/MainLayout';
import ShoppingCartModal from 'modules/checkout/containers/ShoppingCartModal';
import OrderStage from 'modules/product/components/OrderStage';
import styles from './index.module.scss';

const OrderCheckoutPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <MainLayout showFooter={false}>
          <OrderStage />
          <Outlet />
        </MainLayout>
      </div>
      <ShoppingCartModal isOrder={true} />
    </div>
  );
};

export default OrderCheckoutPage;
