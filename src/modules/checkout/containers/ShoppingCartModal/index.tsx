import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';
import {
  memoizedSelectUniqueItems,
  selectOrderTotalPrice,
} from 'redux/slices/shopping-cart';
import ShoppingCart from 'modules/checkout/components/ShoppingCart';
import OrderSummary from 'modules/checkout/components/OrderSummary';

type Properties = {
  onClose?: () => void;
  isOrder?: boolean;
};

const ShoppingCartModal: FC<Properties> = ({
  onClose = () => {},
  isOrder,
}): JSX.Element => {
  const { t } = useTranslation();
  const products = useAppSelector(memoizedSelectUniqueItems);
  const totalPrice = useAppSelector(selectOrderTotalPrice);

  return (
    <ShoppingCart
      title={isOrder ? t('order.summaryTitle') : t('shoppingCart.title')}
      onClose={onClose}
      products={products}
      isOrder={isOrder}
    >
      <OrderSummary
        totalPrice={totalPrice}
        isOrder={isOrder}
        amountProducts={products.length}
      />
    </ShoppingCart>
  );
};

export default ShoppingCartModal;
