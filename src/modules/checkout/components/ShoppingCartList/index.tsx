import React, { FC } from 'react';
import ShoppingCartItem from '../ShoppingCartItem';
import { AddItemPayload } from 'redux/slices/shopping-cart';

type ShoppingCartListProps = {
  products: AddItemPayload[];
  className: string;
};

const ShoppingCartList: FC<ShoppingCartListProps> = ({
  products,
  className,
}): JSX.Element => (
  <div className={className}>
    {products?.map(product => (
      <ShoppingCartItem
        {...product}
        key={product.id + product.colour + product.size}
      />
    ))}
  </div>
);

export default ShoppingCartList;
