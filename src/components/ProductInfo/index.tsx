import React, { useState, FC } from 'react';
import ShoppingBag from 'assets/svgs/ShoppingBag';
import ProductInfoParameters from 'components/ProductInfoParameters';
import { Size, Color } from 'types';
import styles from './index.module.scss';

interface ProductInfo {
  productName: string;
  price: string;
  sizes: Size[];
}

const ProductInfo: FC<ProductInfo> = ({ price, productName, sizes }) => {
  const [selectedColor, setSelectedColor] = useState<Color>(Color.Black);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isError, setIsError] = useState(false);

  const changeParameters = (parameter: string, value: string) => {
    /* eslint-disable */
    switch (parameter) {
      case 'color':
        setSelectedColor(value as Color);
        break;
      case 'size':
        setSelectedSize(value as Size);
        setIsError(false);
        break;
      default:
        break;
    }
  };
  /* eslint-enable */

  const addToBasket = () => {
    if (!selectedSize) {
      setIsError(true);
      return;
    }
    // TODO:add to cart function to complete
    console.log('color:', selectedColor);
    console.log('size:', selectedSize);
  };

  return (
    <div className={styles.info}>
      <div className={styles.nameBox}>
        <p className={styles.productName}>{productName}</p>
        <div className={styles.baskedWrapper}>
          <button className={styles.basked} onClick={addToBasket}>
            <ShoppingBag className={styles.baskedImg} />
          </button>
        </div>
      </div>
      <p className={styles.price}>{price} €</p>
      <div className={styles.productInfoParametersWrapper}>
        <ProductInfoParameters
          changeParameters={changeParameters}
          error={isError}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
